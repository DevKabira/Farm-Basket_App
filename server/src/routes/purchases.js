const express = require('express');
const router = express.Router();
const {
    getAllPurchases,
    getPurchaseById,
    createPurchase,
    updatePurchase,
    deletePurchase
} = require('../controllers/purchasesController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllPurchases);
router.get('/:id', auth, getPurchaseById);
router.post('/', auth, createPurchase);
router.put('/:id', auth, updatePurchase);
router.delete('/:id', auth, deletePurchase);

module.exports = router;