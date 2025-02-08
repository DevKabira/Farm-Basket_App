const pool = require('../db/db');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM users ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single user by id
const getUserbyId = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query(
            'SELECT * FROM users WHERE id = $1', [id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({message: 'User not found'});
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// create a new user
const createUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const result = await pool.query(
            `INSERT INTO users (email, password)
             VALUES ($1, $2) RETURNING *`,
             [email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// update user
const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {email, password} = req.body;
        const result = await pool.query(
            `UPDATE users
             SET email = $1, password = $2
             WHERE id = $3 RETURNING *`,
             [email, password, id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({message: 'User not found'});
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// delete user
const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query(
            'DELETE FROM users WHERE id = $1', [id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message: 'User deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {    
    getAllUsers,
    getUserbyId,
    createUser,
    updateUser,
    deleteUser
};