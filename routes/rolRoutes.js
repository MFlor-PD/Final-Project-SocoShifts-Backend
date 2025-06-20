const rolController = require('../controllers/rolController');
const router = require('express').Router(); 
//const authenticateToken = require('../middlewares/auth');

router.get('/', rolController.getAllRoles);
router.get('/:id', rolController.getRoleById);  
router.post('/', rolController.createRole);//router.post('/', authenticateToken, rolController.createRole);
router.put('/:id', rolController.updateRole);//router.put('/:id', authenticateToken, rolController.updateRole);
router.delete('/:id', rolController.deleteRole);//router.delete('/:id', authenticateToken, rolController.deleteRole);

module.exports = router;