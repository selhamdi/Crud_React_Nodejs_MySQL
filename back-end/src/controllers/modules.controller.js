const ModulesModel = require('../models/modules.model');
 
// get all employee list
exports.getEmployeeList = (req, res)=> {
    //console.log('here all employees list');
    ModulesModel.getAllEmployees((err, modules) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('modules', modules);
        res.send(modules)
    })
}
 
// get employee by Name for earch by Name 
exports.getEmployeeByName = (req, res)=>{
    //console.log('get emp by id');
    ModulesModel.getEmployeeByName(req.params.nom_du_module, (err, modules)=>{
        if(err)
        res.send(err);
        console.log('single modules data',modules);
        res.send(modules);
    })
}
 
 
// create new employee
exports.createNewEmployee = (req, res) =>{
    const employeeReqData = new ModulesModel(req.body);
    console.log('employeeReqData', employeeReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        ModulesModel.createEmployee(employeeReqData, (err, modules)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'modules Created Successfully', data: modules.insertId})
        })
    }
}
 
 
// get employee by ID  for Update 
exports.getEmployeeByID = (req, res)=>{
    //console.log('get emp by id');
    ModulesModel.getEmployeeByID(req.params.id, (err, modules)=>{
        if(err)
        res.send(err);
        console.log('single modules data', modules);
        // res.json({"first_name":"Dheeraj"});
        res.send(JSON.stringify({ status: 200, error: null, response: modules }));
    })
}
 
 
// update employee
exports.updateEmployee = (req, res)=>{
    const employeeReqData = new ModulesModel(req.body);
    console.log('employeeReqData update', employeeReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        ModulesModel.updateEmployee(req.params.id, employeeReqData, (err, modules)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'modules updated Successfully'})
        })
    }
}
 
// delete employee
exports.deleteEmployee = (req, res)=>{
    ModulesModel.deleteEmployee(req.params.id, (err, modules)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'modules deleted successully!'});
    })
}