const express = require('express');
const router = express.Router();
const {
    getAllCustomers,
    getCustomerById,
    createNewCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customersController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllCustomers);
router.get('/:id', auth, getCustomerById);
router.post('/', auth, createNewCustomer);
router.put('/:id', auth, updateCustomer);
router.delete('/:id', auth, deleteCustomer);

module.exports = router;