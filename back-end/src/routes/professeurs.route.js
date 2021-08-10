const express = require('express');
const router = express.Router();
 
const professeursController = require('../controllers/professeurs.controller');
 
// get all 
router.get('/', professeursController.getProfesseursList);
 
// get  by ID
router.get('/:id',professeursController.getProfesseursByID);
 
 
// get ID for Update 
router.get('/searchRecord/:matricule',professeursController.getProfesseursByName);
 
// create new 
router.post('/', professeursController.createNewProfesseurs);
 
// update 
router.put('/:id', professeursController.updateProfesseurs);
 
// delete 
router.delete('/:id',professeursController.deleteProfesseurs);
 
module.exports = router;