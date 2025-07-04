const express = require('express');
const router = express.Router();

const { obtenerConfiguracionHandler, actualizarConfiguracionHandler, borrarMesHandler } = require('../controllers/configuracionCuadranteController');

router.get('/', obtenerConfiguracionHandler);
router.put('/', actualizarConfiguracionHandler);
router.delete('/:mes', borrarMesHandler);

module.exports = router;
