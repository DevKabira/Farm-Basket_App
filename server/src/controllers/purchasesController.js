const pool = require('../db/db');

// Get all purchases
const getAllPurchases = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM purchases ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single purchase by id
const getPurchaseById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT * FROM purchases WHERE id = $1',
            [id]
        );
        if(result.rows.length === 0){
           return res.status(404).json({ message: 'Purchase not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Create a new purchase
const createPurchase = async (req, res) => {
    try {
        const { order_id, supplier_id, quantity, rate, total_amount, status } = req.body;
        const result = await pool.query(
            `INSERT INTO purchases (order_id, supplier_id, quantity, rate, total_amount, status)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
             [order_id, supplier_id, quantity, rate, total_amount, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });       
    }
};

// Update purchase
const updatePurchase = async (req, res) => {
    try {
        const {id} = req.params;
        const {order_id, supplier_id, quantity, rate, total_amount, status } = req.body;
        const result = await pool.query(
            `UPDATE purchases
             SET order_id = $1, supplier_id = $2, quantity = $3, rate = $4, total_amount = $5, status = %6
             WHERE id = $7 RETURNING *`,
             [order_id, supplier_id, quantity, rate, total_amount, status, id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({message: 'Purchase not found'});
        }
        res.json(result.rows[0])
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Delete Purchase
const deletePurchase = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query(
            'DELETE FROM purchases WHERE id = $1',
            [id]
        );
        res.json({ messsage: 'Purchase deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    getAllPurchases,
    getPurchaseById,
    createPurchase,
    updatePurchase,
    deletePurchase
}