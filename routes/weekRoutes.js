const weekController = require ('../controllers/weekController');
const router = require('express').Router();
const authenticateToken = require('../middlewares/auth');

router.get('/', weekController.getAllWeekDays);
router.get('/:id', weekController.getWeekDayById);
router.post('/', authenticateToken, weekController.createWeekDay);
router.put('/:id', authenticateToken, weekController.updateWeekDay);
router.delete('/:id', authenticateToken, weekController.deleteWeekDay);

module.exports = router;
