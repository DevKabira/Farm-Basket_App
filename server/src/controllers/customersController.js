const pool = require('../db/db');

// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM customers ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

// Get a single customers by id
const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);

        if(result.rows.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// Create a new customer
const createNewCustomer = async (req, res) => {
    try{
        const { name, phone, email, address } = req.body;
        const result = await pool.query(
            'INSERT INTO customers (name, phone, email, address) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, phone, email, address]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// Update a customr
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, email, address } = req.body;

        const result = await pool.query(
            'UPDATE customers SET name = $1, phone = $2, email = $3, address = $4 WHERE id = $5 RETURNING *',
            [name, phone, email, address, id]
        );

        if(result.rows.length === 0) {
           return res.status(404).json({message: 'Customer not found'});
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// Delete a customer
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM customers WHERE id = $1', [id]
        );
        res.json({ message: 'Customer deleted succesfully'});
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createNewCustomer,
    updateCustomer,
    deleteCustomer
};