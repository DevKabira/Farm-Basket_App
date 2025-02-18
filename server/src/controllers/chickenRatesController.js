const pool = require('../db/db');

// Get all expenses
const getAllChickenRates = async (req, res, next) => {
    try {
        const result = await pool.query(
            'SELECT * FROM chicken_rates ORDER BY date DESC'
        );
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

// Get a single expense by id
const getChickenById = async (req, res, next) => {
    try {
        const {id} = req.params
        const result = await pool.query(
            'SELECT * FROM chicken_rates WHERE id = $1',
            [id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({message:'Chicken rate not found'});
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error);       
    }
};

// Create a new expense
const createChickenRate = async (req, res, next) => {
    try {
        const { rate, quantity_unit } = req.body;
        const result = await pool.query(
            `INSERT INTO chicken_rates (rate, quantity_unit)
             VALUES ($1, $2) RETURNING *`,
             [rate, quantity_unit]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

// Update expense
const updateChickenRate = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {rate, quantity_unit} = req.body;
        const result = await pool.query(
            `UPDATE chicken_rates
             SET rate = $1, quantity_unit = $2
             WHERE id = $3 RETURNING *`,
             [rate, quantity_unit, id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({message:'Chicken rate not found'});
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// Delete expense
const deleteChicketRate = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await pool.query(
            'DELETE FROM chicken_rates WHERE id = $1',
            [id]
        );
        if(result.rows.length === 0) return res.status(404).json({ message:'Chicken rate not found' });
        res.json({message:'Chicken rates deleted successfully'});
    } catch (error) {
        next(error);
    }
};

module.exports = {
   getAllChickenRates,
   getChickenById,
   createChickenRate,
   updateChickenRate,
   deleteChicketRate
};