const express = require('express');
const router = express.Router();
 
const etudiantsController = require('../controllers/etudiants.controller')
 
// get all 
router.get('/', etudiantsController.getEtudiantsList);
 
// get  by ID
router.get('/:id', etudiantsController.getEtudiantsByID);
 
 
// get ID for Update 
router.get('/searchRecord/:cin', etudiantsController.getEtudiantsByName);
 
// create new 
router.post('/', etudiantsController.createNewEtudiants);
 
// update 
router.put('/:id', etudiantsController.updateEtudiants);
 
// delete 
router.delete('/:id',etudiantsController.deleteEtudiants);
 
module.exports = router;