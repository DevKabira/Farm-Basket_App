const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserbyId,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/usersController');

router.get('/', getAllUsers);
router.get('/:id', getUserbyId);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;