const router = require('express').Router();
const monthController = require('../controllers/monthController');

router.get('/', monthController.getAllMonths);
router.get('/:id', monthController.getMonthById);
router.post('/', monthController.createMonth);
router.put('/:id', monthController.updateMonth);
router.delete('/:id', monthController.deleteMonth);

module.exports = router;
