const express = require('express');
const router = express.Router();
const { obtenerUsuariosConAsignaciones, crearAsignacionHandler } = require('../controllers/cuadranteController');



router.get('/', obtenerUsuariosConAsignaciones);
router.post('/', crearAsignacionHandler);

module.exports = router;





