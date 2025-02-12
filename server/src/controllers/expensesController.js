const pool = require('../db/db');

// Get all expenses
const getAllExpenses = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM expenses ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

// Get a single expense by id
const getExpenseById = async (req, res) => {
    try {
        const {id} = req.params
        const result = await pool.query(
            'SELECT * FROM expenses WHERE id = $1',
            [id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({message:'Expense not found'});
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error);       
    }
};

// Create a new expense
const createExpense = async (req, res) => {
    try {
        const { order_id, description, amount, category } = req.body;
        const result = await pool.query(
            `INSERT INTO expenses (order_id, description, amount, category)
             VALUES ($1, $2, $3, $4) RETURNING *`,
             [order_id, description, amount, category]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

// Update expense
const updateExpense = async (req, res) => {
    try {
        const {id} = req.params;
        const {order_id, description, amount, category} = req.body;
        const result = await pool.query(
            `UPDATE expenses
             SET order_id =$1, description = $2, amount = $3, category = $4
             WHERE id = $5 RETURNING *`,
             [order_id, description, amount, category, id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({message:'Expense not found'});
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// Delete expense
const deleteExpense = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query(
            'DELETE FROM expenses WHERE id = $1',
            [id]
        );
        res.json({message:'Expense deleted successfully'});
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense
};