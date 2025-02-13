const express = require('express');
const router = express.Router();
const {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
} = require('../controllers/paymentsController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllPayments);
router.get('/:id', auth, getPaymentById);
router.post('/', auth, createPayment);
router.put('/:id', auth, updatePayment);
router.delete('/:id', auth, deletePayment);

module.exports = router;