const { threadId } = require('../../config/db.config');
var dbConn  = require('../../config/db.config');
 
var Professeurs = function(professeurs){
    this.matricule= professeurs.matricule;
    this.nom_complet= professeurs.nom_complet;
    this.date_inscription =professeurs.date_inscription;
    this.modules_enseigner=professeurs.modules_enseigner;
  }
 
// get all employees
Professeurs.getAllEmployees = (result) =>{
    dbConn.query('SELECT * FROM professeurs', (err, res)=>{
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
Professeurs.getEmployeeByName = ( cin, result)=>{
    dbConn.query('SELECT * FROM professeurs WHERE matricule=?',cin, (err, res)=>{
        if(err){
            console.log('Error while fetching modules by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}
 
// create new employee
Professeurs.createEmployee = (employeeReqData, result) =>{
    dbConn.query('INSERT INTO professeurs SET ?', employeeReqData, (err, res)=>{
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
Professeurs.getEmployeeByID = (id, result)=>{
    dbConn.query('SELECT * FROM professeurs WHERE id=?', id, (err, res)=>{
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
Professeurs.updateEmployee = (id, employeeReqData, result)=>{
    dbConn.query("UPDATE professeurs SET matricule=? ,nom_complet=?, date_inscription=? , modules_enseigner=? WHERE id = ?", [employeeReqData.matricule,employeeReqData.nom_complet,employeeReqData.date_inscription,employeeReqData.modules_enseigner, id], (err, res)=>{
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
Professeurs.deleteEmployee = (id, result)=>{
    dbConn.query('DELETE FROM Professeurs WHERE id=?', [id], (err, res)=>{
        if(err){
            console.log('Error while deleting the modules');
            result(null, err);
        }else{
            result(null, res);
        }
    })
  
}
 
module.exports = Professeurs;