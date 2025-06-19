const rolController = require('../controllers/rolController');
const router = require('express').Router(); 

router.get('/', rolController.getAllRoles);
router.get('/:id', rolController.getRoleById);  
router.post('/', rolController.createRole);
router.put('/:id', rolController.updateRole);
router.delete('/:id', rolController.deleteRole);

module.exports = router;