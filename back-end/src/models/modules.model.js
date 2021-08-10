var dbConn  = require('../../config/db.config');
 
var Modules = function(modules){
    this.nom_du_module     =   modules.nom_du_module;
    this.coefficient      =   modules.coefficient;
  }
 
// get all modules
Modules.getAllModules = (result) =>{
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
 
// get modules by Name for Search Data by name 
Modules.getModulesByName = ( nom_du_module, result)=>{
    dbConn.query('SELECT * FROM modules WHERE nom_du_module=?',nom_du_module, (err, res)=>{
        if(err){
            console.log('Error while fetching modules by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}
 
// create new modules
Modules.createModules= (modulesReqData, result) =>{
    dbConn.query('INSERT INTO modules SET ?', modulesReqData, (err, res)=>{
        if(err){
            console.log('Error while inserting data');
            result(null, err);
        }else{
            console.log('modules created successfully');
            result(null, res)
        }
    })
}
 
 
// get modules by ID for update
Modules.getModulesByID = (id, result)=>{
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
 
 
// update 
Modules.updateModules = (id, modulesReqData, result)=>{
    dbConn.query("UPDATE modules SET nom_du_module=? , coefficient=? WHERE id = ?", [modulesReqData.nom_du_module,modulesReqData.coefficient, id], (err, res)=>{
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
Modules.deleteModules = (id, result)=>{
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