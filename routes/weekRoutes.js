const weekController = require ('../controllers/weekController');
const router = require('express').Router();

router.get('/', weekController.getAllWeekDays);
router.get('/:id', weekController.getWeekDayById);
router.post('/', weekController.createWeekDay);
router.put('/:id', weekController.updateWeekDay);
router.delete('/:id', weekController.deleteWeekDay);

module.exports = router;
