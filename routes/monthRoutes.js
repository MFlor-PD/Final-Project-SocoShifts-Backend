const router = require('express').Router();
const monthController = require('../controllers/monthController');
//const authenticateToken = require('../middlewares/auth');

router.get('/', monthController.getAllMonths);
router.get('/:id', monthController.getMonthById);
router.post('/', monthController.createMonth);//router.post('/', authenticateToken, monthController.createMonth);
router.put('/:id', monthController.updateMonth);//router.put('/:id', authenticateToken, monthController.updateMonth);
router.delete('/:id', monthController.deleteMonth);//router.delete('/:id', authenticateToken, monthController.deleteMonth);


module.exports = router;
