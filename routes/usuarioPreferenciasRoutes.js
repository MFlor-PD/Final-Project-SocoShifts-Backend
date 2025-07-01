const express = require('express');
const router = express.Router();
const { asignarDiasPreferidos } = require('../controllers/usuarioPreferenciasController');

router.post('/', asignarDiasPreferidos);

module.exports = router;
