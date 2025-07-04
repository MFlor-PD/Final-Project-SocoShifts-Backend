const express = require('express');
const router = express.Router();

const {
  generarCuadranteHandler,
  obtenerCuadranteHandler,
  editarAsignacionHandler,
  eliminarAsignacionHandler
} = require('../controllers/cuadranteController');

router.get('/', obtenerCuadranteHandler);              
router.post('/generar', generarCuadranteHandler);      
router.put('/editar', editarAsignacionHandler);        
router.delete('/eliminar', eliminarAsignacionHandler); 

module.exports = router;

