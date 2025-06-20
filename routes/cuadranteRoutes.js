const express = require('express');
const router = express.Router();
const { cuadranteController } = require('../controllers/cuadranteController');

router.post('/', cuadranteController);

module.exports = router;
