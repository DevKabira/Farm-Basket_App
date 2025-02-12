const pool = require('../db/db');

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM orders ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

// Get a single order by id
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT * FROM orders WHERE id = $1', [id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({ message: 'Order not found' })
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

// Create a new order
const createNewOrder = async (req, res) => {
    try {
        const { customer_id, quantity, rate, total_amount, outstanding_amount, status } = req.body;
        const result = await pool.query(
            `INSERT INTO orders (customer_id, quantity, rate, total_amount, outstanding_amount, status) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [customer_id, quantity, rate, total_amount, outstanding_amount, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// Update order
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, rate, total_amount, status } = req.body;
        const result = await pool.query(
            `UPDATE orders
             SET quantity = $1, rate = $2, total_amount = $3, status = $4
             WHERE id = $5 RETURNING *`,
            [quantity, rate, total_amount, status, id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM orders WHERE id = $1',
            [id]
        );
        res.json({ message: 'Order deleted succesfully' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllOrders,
    getOrderById,
    createNewOrder,
    updateOrder,
    deleteOrder
}