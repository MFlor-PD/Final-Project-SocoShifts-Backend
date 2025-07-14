const express = require('express');
const router = express.Router();
const obtenerCuadrantePorTrabajadorHandler = require('../controllers/obtenerCuadrantePorTrabajadorHandler');

router.get('/:id', obtenerCuadrantePorTrabajadorHandler);


module.exports = router;