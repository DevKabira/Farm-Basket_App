const express = require('express');
const router = express.Router();
const {
    getAllCustomers,
    getCustomerById,
    createNewCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customersController');

router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.post('/', createNewCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;