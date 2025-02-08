const express = require('express');
const router = express.Router();
const {
    getAllChickenRates,
   getChickenById,
   createChickenRate,
   updateChickenRate,
   deleteChicketRate
} = require('../controllers/chickenRatesController');

router.get('/', getAllChickenRates);
router.get('/:id', getChickenById);
router.post('/', createChickenRate);
router.put('/:id', updateChickenRate);
router.delete('/:id', deleteChicketRate);

module.exports = router;