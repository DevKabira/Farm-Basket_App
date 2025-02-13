const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserbyId,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/usersController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUserbyId);
router.post('/', auth, createUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;