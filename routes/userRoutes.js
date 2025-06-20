const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//const authMiddleware = require('../middlewares/auth');
//const authPermissions = require('../middlewares/authPermissions');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);//router.post('/', authMiddleware, authPermissions('crear_usuario'), userController.createUser);
router.put('/:id', userController.editUser);//router.put('/:id', authMiddleware, authPermissions('editar_usuario'), userController.editUser);
router.delete('/:id', userController.deleteUser);//router.delete('/:id', authMiddleware, authPermissions('eliminar_usuario'), userController.deleteUser);


module.exports = router;