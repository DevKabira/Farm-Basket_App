const express = require('express');
const router = express.Router();
const {
    getAllOrders,
    getOrderById,
    createNewOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/ordersController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllOrders);
router.get('/:id', auth, getOrderById);
router.post('/', auth, createNewOrder);
router.put('/:id', auth, updateOrder);
router.delete('/:id', auth, deleteOrder);

module.exports = router;