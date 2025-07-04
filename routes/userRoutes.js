const express = require('express');
const router = express.Router();
const { getUsers, getUserById, crearUsuarioHandler, editUserbyId, deleteUserbyId } = require('../controllers/userController');

router.get('/', getUsers);              
router.get('/:id', getUserById);        
router.post('/', crearUsuarioHandler);  
router.put('/:id', editUserbyId)           
router.delete('/:id', deleteUserbyId)

module.exports = router;
