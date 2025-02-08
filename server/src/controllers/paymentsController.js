const pool = require('../db/db');

// Get all payments
const getAllPayments = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM payments ORDER BY payment_date DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
    
};

// Get a single payment by id
const getPaymentById = async (req, res) => {
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
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
};

// Create a new payment
const createPayment = async (req, res) => {
    try {
        const {order_id, amount_paid, payment_type} = req.body;
        await pool.query(
            `INSERT INTO payments (order_id, amount_paid, payment_type)
             VALUES ($1, $2, $3) RETURNING *`,
             [order_id, amount_paid, payment_type]
        );
        await pool.query(
            `UPDATE orders
             SET outstanding_amount = outstanding_amount - $1
             WHERE id = $2`,
             [amount_paid, order_id]
        );

        res.status(201).json({message:'Payment recorded successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
};

// Update payment
const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount_paid, payment_type} = req.body;
        const result = await pool.query(
            `UPDATE payments
             SET amount_paid = $1, payment_type = $2
             WHERE id = $3 RETURNING *`,
             [amount_paid, payment_type, id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({message:'Payment not found'});
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
};

// Delete payment
const deletePayment = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query(
            'DELETE FROM payments WHERE id = $1',
            [id]
        );
        res.json({message:'Payment deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
}

module.exports = {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
}