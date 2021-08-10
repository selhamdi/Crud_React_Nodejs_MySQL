const { threadId } = require('../../config/db.config');
var dbConn  = require('../../config/db.config');
 
var Professeurs = function(professeurs){
    this.matricule= professeurs.matricule;
    this.nom_complet= professeurs.nom_complet;
    this.date_inscription =professeurs.date_inscription;
    this.modules_enseigner=professeurs.modules_enseigner;
  }
 
// get all 
Professeurs.getAllProfesseurs = (result) =>{
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
 
// get  by Name for Search Data by name 
Professeurs.getProfesseursByName = ( cin, result)=>{
    dbConn.query('SELECT * FROM professeurs WHERE matricule=?',cin, (err, res)=>{
        if(err){
            console.log('Error while fetching modules by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}
 
// create new 
Professeurs.createProfesseurs = (professeursReqData, result) =>{
    dbConn.query('INSERT INTO professeurs SET ?', professeursReqData, (err, res)=>{
        if(err){
            console.log('Error while inserting data');
            result(null, err);
        }else{
            console.log('modules created successfully');
            result(null, res)
        }
    })
}
 
 
// get by ID for update
Professeurs.getProfesseursByID = (id, result)=>{
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
 
 
// update 
Professeurs.updateProfesseurs = (id, professeursReqData, result)=>{
    dbConn.query("UPDATE professeurs SET matricule=? ,nom_complet=?, date_inscription=? , modules_enseigner=? WHERE id = ?", [professeursReqData.matricule ,professeursReqData.nom_complet , professeursReqData.date_inscription, professeursReqData.modules_enseigner ,id],(err, res)=>{
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
Professeurs.deleteProfesseurs = (id, result)=>{
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