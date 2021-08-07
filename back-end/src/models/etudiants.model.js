const { threadId } = require('../../config/db.config');
var dbConn  = require('../../config/db.config');
 
var Etudiants = function(etudiants){
    this.nom_complet= etudiants.nom_complet;
    this.cin= etudiants.cin;
    this.date_de_naissance=etudiants.date_de_naissance;
    this.filiere = etudiants.filiere ;
    this.date_inscription =etudiants.date_inscription;
    this.modules=etudiants.modules;
  }
 
// get all employees
Etudiants.getAllEmployees = (result) =>{
    dbConn.query('SELECT * FROM etudiants', (err, res)=>{
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
Etudiants.getEmployeeByName = ( cin, result)=>{
    dbConn.query('SELECT * FROM etudiants WHERE cin=?',cin, (err, res)=>{
        if(err){
            console.log('Error while fetching modules by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}
 
// create new employee
Etudiants.createEmployee = (employeeReqData, result) =>{
    dbConn.query('INSERT INTO etudiants SET ?', employeeReqData, (err, res)=>{
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
Etudiants.getEmployeeByID = (id, result)=>{
    dbConn.query('SELECT * FROM etudiants WHERE id=?', id, (err, res)=>{
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
Etudiants.updateEmployee = (id, employeeReqData, result)=>{
    dbConn.query("UPDATE etudiants SET nom_complet=? , cin=? , date_de_naissance=? , filiere=? , date_inscription=? , modules=? WHERE id = ?", [employeeReqData.nom_complet,employeeReqData.cin,employeeReqData.date_de_naissance,employeeReqData.filiere,employeeReqData.date_inscription,employeeReqData.modules, id], (err, res)=>{
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
Etudiants.deleteEmployee = (id, result)=>{
    dbConn.query('DELETE FROM etudiants WHERE id=?', [id], (err, res)=>{
        if(err){
            console.log('Error while deleting the modules');
            result(null, err);
        }else{
            result(null, res);
        }
    })
  
}
 
module.exports = Etudiants;