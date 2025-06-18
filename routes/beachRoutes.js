const express = require('express');
const router = express.Router();
const beachController = require('../controllers/beachController');

router.get('/', beachController.getBeaches);
router.get('/:id', beachController.getBeachById);
router.post('/', beachController.createBeach);
router.put('/:id', beachController.editBeach);
router.delete('/:id', beachController.deleteBeach);

module.exports = router;
