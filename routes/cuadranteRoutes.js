const express = require('express');
const router = express.Router();
const { getCuadranteController, cuadranteController } = require('../controllers/cuadranteController');


router.post('/', cuadranteController);
router.get('/', getCuadranteController)

module.exports = router;
