const express = require('express');
const router = express.Router();
const { generarCuadranteHandler, obtenerCuadranteHandler } = require('../controllers/cuadranteController');

router.get('/', obtenerCuadranteHandler);
router.post('/generar', generarCuadranteHandler);

module.exports = router;
