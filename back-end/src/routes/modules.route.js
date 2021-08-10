const express = require('express');
const router = express.Router();
 
const modulesController = require('../controllers/modules.controller');
 
// get all 
router.get('/', modulesController.getModulesList);
 
// get  by ID
router.get('/:id',modulesController.getModulesByID);
 
 
// get ID for Update 
router.get('/searchRecord/:nom_du_module',modulesController.getModulesByName);
 
// create new 
router.post('/', modulesController.createNewModules);
 
// update 
router.put('/:id', modulesController.updateModules);
 
// delete 
router.delete('/:id',modulesController.deleteModules);
 
module.exports = router;