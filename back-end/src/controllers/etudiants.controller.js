const EtudiantsModel = require('../models/etudiants.model');
 
// get all  list
exports.getEtudiantsList = (req, res)=> {
    EtudiantsModel.getAllEtudiants((err, etudiants) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('Etudiants', etudiants);
        res.send(etudiants)
    })
}
 
// get  by Name for earch by Name 
exports.getEtudiantsByName = (req, res)=>{
    EtudiantsModel.getEtudiantsByName(req.params.cin, (err, etudiants)=>{
        if(err)
        res.send(err);
        console.log('single etudiants data',etudiants);
        res.send(etudiants);
    })
}
 
 
// create new 
exports.createNewEtudiants = (req, res) =>{
    const etudiantsReqData = new EtudiantsModel(req.body);
    console.log('etudiantsReqData', etudiantsReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        EtudiantsModel.createEtudiants( etudiantsReqData, (err, etudiants)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'etudiants Created Successfully', data: etudiants.insertId})
        })
    }
}
 
 
// get  by ID  for Update 
exports.getEtudiantsByID = (req, res)=>{
    EtudiantsModel.getEtudiantsByID(req.params.id, (err, etudiants)=>{
        if(err)
        res.send(err);
        console.log('single etudiants data' ,etudiants);
       res.send(JSON.stringify({ status: 200, error: null, response: etudiants }));
    })
}
 
 
// update 
exports.updateEtudiants = (req, res)=>{
    const etudiantsReqData = new EtudiantsModel(req.body);
    console.log('etudiantsReqData update', etudiantsReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        EtudiantsModel.updateEtudiants(req.params.id, etudiantsReqData, (err, etudiants)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Etudiants updated Successfully'})
        })
    }
}
 
// delete 
exports.deleteEtudiants = (req, res)=>{
    EtudiantsModel.deleteEtudiants(req.params.id, (err, etudiants)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'Etudiants deleted successully!'});
    })
}