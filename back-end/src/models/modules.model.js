var dbConn  = require('../../config/db.config');
 
var Modules = function(modules){
    this.nom_du_module     =   modules.nom_du_module;
    this.coefficient      =   modules.coefficient;
  }
 
// get all employees
Modules.getAllEmployees = (result) =>{
    dbConn.query('SELECT * FROM modules', (err, res)=>{
        if(err){
            console.log('Error while fetching modules', err);
            result(null,err);
        }else{
            console.log('modules fetched successfully');
            result(null,res);
        }
    })
}
 
// get employee by Name for Search Data by name 
Modules.getEmployeeByName = ( nom_du_module, result)=>{
    dbConn.query('SELECT * FROM modules WHERE nom_du_module=?',nom_du_module, (err, res)=>{
        if(err){
            console.log('Error while fetching modules by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}
 
// create new employee
Modules.createEmployee = (employeeReqData, result) =>{
    dbConn.query('INSERT INTO modules SET ?', employeeReqData, (err, res)=>{
        if(err){
            console.log('Error while inserting data');
            result(null, err);
        }else{
            console.log('modules created successfully');
            result(null, res)
        }
    })
}
 
 
// get employee by ID for update
Modules.getEmployeeByID = (id, result)=>{
    dbConn.query('SELECT * FROM modules WHERE id=?', id, (err, res)=>{
        if(err)
        {
            console.log('Error while fetching modules by id', err);
            result(null, err);
        }
        else
        {
            result(null, res);
        }
    })
}
 
 
// update employee
Modules.updateEmployee = (id, employeeReqData, result)=>{
    dbConn.query("UPDATE modules SET nom_du_module=? , coefficient=? WHERE id = ?", [employeeReqData.nom_du_module,employeeReqData.coefficient, id], (err, res)=>{
        if(err){
            console.log('Error while updating the modules');
            result(null, err);
        }else{
            console.log("modules updated successfully");
            result(null, res);
        }
    });
}
 
// delete employee
Modules.deleteEmployee = (id, result)=>{
    dbConn.query('DELETE FROM modules WHERE id=?', [id], (err, res)=>{
        if(err){
            console.log('Error while deleting the modules');
            result(null, err);
        }else{
            result(null, res);
        }
    })
  
}
 
module.exports = Modules;