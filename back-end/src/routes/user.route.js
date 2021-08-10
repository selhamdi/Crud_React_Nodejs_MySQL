const express = require('express');
const router = express.Router();
 
const professeursController = require('../controllers/user.controller')
 

 
 

 
// create new 
router.post('/register', professeursController.createNewUser);
 
router.post('/login', professeursController.createNewUserr);


 
module.exports = router;