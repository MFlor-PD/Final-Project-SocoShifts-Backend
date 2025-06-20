const express = require('express');
const router = express.Router();
const beachController = require('../controllers/beachController');
//const authenticateToken = require('../middlewares/auth');

router.get('/', beachController.getBeaches);
router.get('/:id', beachController.getBeachById);
router.post('/', beachController.createBeach); //router.post('/', /*authenticateToken,*/ beachController.createBeach);
router.put('/:id', beachController.editBeach);//router.put('/:id', /*authenticateToken,*/ beachController.editBeach);
router.delete('/:id', beachController.deleteBeach);//router.delete('/:id', /*authenticateToken,*/ beachController.deleteBeach);

module.exports = router;
