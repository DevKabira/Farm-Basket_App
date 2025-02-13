const express = require('express');
const router = express.Router();
const {
    getAllChickenRates,
   getChickenById,
   createChickenRate,
   updateChickenRate,
   deleteChicketRate
} = require('../controllers/chickenRatesController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllChickenRates);
router.get('/:id', auth, getChickenById);
router.post('/', auth, createChickenRate);
router.put('/:id', auth, updateChickenRate);
router.delete('/:id', auth, deleteChicketRate);

module.exports = router;