const express = require('express');
const router = express.Router();
const { obtenerUsuariosConAsignaciones, crearAsignacionHandler, generarCuadranteHandler } = require('../controllers/cuadranteController');



router.get('/', obtenerUsuariosConAsignaciones);
router.post('/', crearAsignacionHandler);
router.post('/generar', generarCuadranteHandler);

module.exports = router;





