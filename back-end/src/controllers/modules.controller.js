const ModulesModel = require('../models/modules.model');
 
// get all  list
exports.getModulesList = (req, res)=> {

    ModulesModel.getAllModules((err, modules) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('modules', modules);
        res.send(modules)
    })
}
 
// get modules by Name for earch by Name 
exports.getModulesByName = (req, res)=>{
    ModulesModel.gettModulesByName(req.params.nom_du_module, (err, modules)=>{
        if(err)
        res.send(err);
        console.log('single modules data',modules);
        res.send(modules);
    })
}
 
 
// create new 
exports.createNewModules = (req, res) =>{
    const modulesReqData = new ModulesModel(req.body);
    console.log('modulesReqData', modulesReqData);

    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        ModulesModel.createModules(modulesReqData, (err, modules)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'modules Created Successfully', data: modules.insertId})
        })
    }
}
 
 
// get  by ID  for Update 
exports.getModulesByID = (req, res)=>{
    ModulesModel.getModulesByID(req.params.id, (err, modules)=>{
        if(err)
        res.send(err);
        console.log('single modules data', modules);
        res.send(JSON.stringify({ status: 200, error: null, response: modules }));
    })
}
 
 
// update 
exports.updateModules = (req, res)=>{
    const modulesReqData = new ModulesModel(req.body);
    console.log('modulesReqData update', modulesReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        ModulesModel.updateModules(req.params.id, modulesReqData, (err, modules)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'modules updated Successfully'})
        })
    }
}
 
// delete 
exports.deleteModules = (req, res)=>{
    ModulesModel.deleteModules(req.params.id, (err, modules)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'modules deleted successully!'});
    })
}