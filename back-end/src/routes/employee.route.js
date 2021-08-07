const express = require('express');
const router = express.Router();
 
const employeeController = require('../controllers/employee.controller');
 
// get all employees
router.get('/', employeeController.getEmployeeList);
 
// get employee by ID
router.get('/:id',employeeController.getEmployeeByID);
 
 
// get ID for Update 
router.get('/searchRecord/:first_name',employeeController.getEmployeeByName);
 
// create new employee
router.post('/', employeeController.createNewEmployee);
 
// update employee
router.put('/:id', employeeController.updateEmployee);
 
// delete employee
router.delete('/:id',employeeController.deleteEmployee);
 
module.exports = router;