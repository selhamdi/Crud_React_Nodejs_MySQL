const EtudiantsModel = require('../models/etudiants.model');
 
// get all employee list
exports.getEmployeeList = (req, res)=> {
    //console.log('here all employees list');
    EtudiantsModel.getAllEmployees((err, employees) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('Employees', employees);
        res.send(employees)
    })
}
 
// get employee by Name for earch by Name 
exports.getEmployeeByName = (req, res)=>{
    //console.log('get emp by id');
    EtudiantsModel.getEmployeeByName(req.params.cin, (err, employee)=>{
        if(err)
        res.send(err);
        console.log('single employee data',employee);
        res.send(employee);
    })
}
 
 
// create new employee
exports.createNewEmployee = (req, res) =>{
    const employeeReqData = new EtudiantsModel(req.body);
    console.log('employeeReqData', employeeReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        EtudiantsModel.createEmployee(employeeReqData, (err, employee)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Employee Created Successfully', data: employee.insertId})
        })
    }
}
 
 
// get employee by ID  for Update 
exports.getEmployeeByID = (req, res)=>{
    //console.log('get emp by id');
    EtudiantsModel.getEmployeeByID(req.params.id, (err, employee)=>{
        if(err)
        res.send(err);
        console.log('single employee data',employee);
        // res.json({"first_name":"Dheeraj"});
        res.send(JSON.stringify({ status: 200, error: null, response: employee }));
    })
}
 
 
// update employee
exports.updateEmployee = (req, res)=>{
    const employeeReqData = new EtudiantsModel(req.body);
    console.log('employeeReqData update', employeeReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        EtudiantsModel.updateEmployee(req.params.id, employeeReqData, (err, employee)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Employee updated Successfully'})
        })
    }
}
 
// delete employee
exports.deleteEmployee = (req, res)=>{
    EtudiantsModel.deleteEmployee(req.params.id, (err, employee)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'Employee deleted successully!'});
    })
}