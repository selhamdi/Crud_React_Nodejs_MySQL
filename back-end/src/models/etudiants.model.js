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
 
// get all 
Etudiants.getAllEtudiants = (result) =>{
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
 
// get  by Name for Search Data by name 
Etudiants.getEtudiantsByName = ( cin, result)=>{
    dbConn.query('SELECT * FROM etudiants WHERE cin=?',cin, (err, res)=>{
        if(err){
            console.log('Error while fetching modules by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}
 
// create new 
Etudiants.createEtudiants = (EtudiantsReqData, result) =>{
    dbConn.query('INSERT INTO etudiants SET ?', EtudiantsReqData, (err, res)=>{
        if(err){
            console.log('Error while inserting data');
            result(null, err);
        }else{
            console.log('modules created successfully');
            result(null, res)
        }
    })
}
 
 
// get  by ID for update
Etudiants.getEtudiantsByID = (id, result)=>{
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
 
 
// update 
Etudiants.updateEtudiants = (id, etudiantsReqData, result)=>{
    dbConn.query("UPDATE etudiants SET nom_complet=? , cin=? , date_de_naissance=? , filiere=? , date_inscription=? , modules=? WHERE id = ?", [etudiantsReqData.nom_complet,etudiantsReqData.cin,etudiantsReqData.date_de_naissance,etudiantsReqData.filiere,etudiantsReqData.date_inscription,etudiantsReqData.modules, id], (err, res)=>{
        if(err){
            console.log('Error while updating the modules');
            result(null, err);
        }else{
            console.log("modules updated successfully");
            result(null, res);
        }
    });
}
 
// delete 
Etudiants.deleteEtudiants = (id, result)=>{
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