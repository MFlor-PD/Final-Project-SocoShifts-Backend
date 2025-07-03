const express = require('express');
const router = express.Router();
const { getUsers, getUserById, crearUsuarioHandler } = require('../controllers/userController');

router.get('/', getUsers);              // GET /usuarios
router.get('/:id', getUserById);        // GET /usuarios/:id
router.post('/', crearUsuarioHandler);  // POST /usuarios

module.exports = router;
