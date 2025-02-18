const pool = require('../db/db');
const { runTransaction } = require('../utils/TransactionHelper');

// Get all payments
const getAllPayments = async (req, res, next) => {
    try {
        const result = await pool.query(
            'SELECT * FROM payments ORDER BY payment_date DESC'
        );
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
    
};

// Get a single payment by id
const getPaymentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT * FROM payments WHERE id = $1',
            [id]
        );
        if(result.rows.length === 0) {
            return res.status(404).json({message:'Payment not found'});
        }
        res.json(result.rows[0]);
    } catch (error) {
       next(error);
    }
};

// Create a new payment
const createPayment = async (req, res, next) => {
    try {
        const {order_id, amount_paid, payment_type} = req.body;
        
        const newPayment = await runTransaction(async (client) => {
            // Fetch current outstanding amount
            const order = await client.query(
                'SELECT outstanding_amount FROM orders WHERE id = $1 FOR UPDATE', [order_id]
            );

            if(order.rows.length === 0) { throw new Error('Order not found') };

            const currentOutstanding = order.rows[0].outstanding_amount;
            if(amount_paid > currentOutstanding) { throw new Error('Payment exceeds outstanding amount') };

            // Insert new payment
            const payment = await client.query(
                `INSERT INTO payments (order_id, amount_paid, payment_type)
                 VALUES ($1, $2, $3) RETURNING *`,
                 [order_id, amount_paid, payment_type]
            );

            // Update outstanding amount
            await client.query(
                `UPDATE orders
                 SET outstanding_amount = outstanding_amount - $1
                 WHERE id = $2`,
                 [amount_paid, order_id]
            );

            return payment.rows[0];

        });

        res.status(201).json({ message: 'Payment recorded successfully', payment: newPayment });

    } catch (error) {
       next(error);
    }
};

// Update payment
const updatePayment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { amount_paid, payment_type } = req.body;
        
        const updatedPayment = await runTransaction(async (client) => {
            // Fetch old payment & order details
            const oldpayment = await client.query(
                'SELECT order_id, amount_paid FROM payments WHERE id = $1', [id]
            );
            if (oldpayment.rows.length === 0) return res.status(404).json({ message:'Payment not found' });

            const { order_id, amount_paid: oldAmountPaid } = oldpayment.rows[0];

            // Fetch current outstanding amount
            const order = await client.query(
                'SELECT COALESCE(outstanding_amount, 0) AS outstanding_amount FROM orders WHERE id = $1 FOR UPDATE', 
                [order_id]
            );
            if (order.rows.length === 0) return res.status(404).json({ message:'Payment not found' });

            let currentOutstanding = Number(order.rows[0].outstanding_amount); // Ensure it's a number
            let oldAmountPaidNum = Number(oldAmountPaid); // Ensure oldAmountPaid is also a number
            let amountPaidNum = Number(amount_paid); // Ensure new amount_paid is a number

            // Calculate new outstanding amount
            const newOutstanding = currentOutstanding + oldAmountPaidNum - amountPaidNum;
            if (newOutstanding < 0) return res.status(400).json({ message:'Updated payment amount exceeds outstanding balance' });

            // Update payment
            const payment = await client.query(
                `UPDATE payments
                 SET amount_paid = $1, payment_type = $2
                 WHERE id = $3 RETURNING *`,
                 [amountPaidNum, payment_type, id]
            );

            // Update outstanding amount in orders
            await client.query(
                `UPDATE orders
                 SET outstanding_amount = $1
                 WHERE id = $2`,
                 [newOutstanding, order_id]
            );

            return payment.rows[0];
        });

        res.json({ message: 'Payment updated successfully', payment: updatedPayment });

    } catch (error) {
        next(error);
    }
};


// Delete payment
const deletePayment = async (req, res, next) => {
    try {
        const {id} = req.params;
        
        await runTransaction(async (client) => {
            // FETCH THE PAYMENT DETAILS
            const payment = await client.query(
                'SELECT order_id, amount_paid FROM payments WHERE id = $1', [id]
            );

            if(payment.rows.length === 0) return res.status(404).json({ message:'Payment not found' });

            const { order_id, amount_paid } = payment.rows[0];

            // Delete payment
            await client.query(
                'DELETE FROM payments WHERE id = $1', [id]
            );

            // Restore outstanding amount in orders
            await client.query(
                `UPDATE orders
                 SET outstanding_amount = outstanding_amount + $1
                 WHERE id = $2`,
                 [amount_paid, order_id]
            );
        });

        res.json({ message: 'Payment deleted successfully'})

    } catch (error) {
       next(error);
    }
}

module.exports = {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
}