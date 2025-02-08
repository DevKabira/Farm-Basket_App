const express = require('express');
const router = express.Router();
const {
    getAllOrders,
    getOrderById,
    createNewOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/ordersController')

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createNewOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;