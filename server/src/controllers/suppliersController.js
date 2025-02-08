const pool = require('../db/db');

// Get all suppliers
const getAllSuppliers = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM suppliers ORDER BY created_at DESC' 
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
};

// Get a single supplier by id
const getSupplierById = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query(
            'SELECT * FROM suppliers WHERE id = $1', [id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({message: 'Supplier not found'});
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
}

// create a new supplier
const createSupplier = async (req, res) => {
    try {
        const { name, contact_person, phone, email, address } = req.body;
        const result = await pool.query(
            `INSERT INTO suppliers (name, contact_person, phone, email, address)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
             [name, contact_person, phone, email, address]
        );
        res.status(201).json(res.result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
};

// update supplier
const updateSupplier = async (req, res) => {
    try {
        const {id} = req.params;
        const { name, contact_person, phone, email, address } = req.body;
        const result = await pool.query(
            `UPDATE suppliers
             SET name = $1, contact_person = $2, phone = $3, email = $4, address = $5
             WHERE is = $6 RETURNING *`,
             [name, contact_person, phone, email, address, id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({message: 'Supplier not found'});
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
}

// delete supplier
const deleteSupplier = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query(
            'DELETE FROM suppliers WHERE id = $1', [id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({message: 'Supplier not found'});
        }
        res.json({message: 'Supplier deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
    
}

module.exports = {
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier
};