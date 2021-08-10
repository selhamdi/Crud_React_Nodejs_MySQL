const ProfesseursModel = require('../models/professeurs.model');
 
// get all  list
exports.getProfesseursList = (req, res)=> {
    ProfesseursModel.getAllProfesseurs((err, professeurs) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('Professeurs', professeurs);
        res.send(professeurs)
    })
}
 
// get  by Name for earch by Name 
exports.getProfesseursByName = (req, res)=>{
    ProfesseursModel.getProfesseursByName(req.params.matricule, (err, professeurs)=>{
        if(err)
        res.send(err);
        console.log('single professeurs data',professeurs);
        res.send(professeurs);
    })
}
 
 
// create new 
exports.createNewProfesseurs = (req, res) =>{
    const professeursReqData = new ProfesseursModel(req.body);
    console.log('professeursReqData', professeursReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        ProfesseursModel.createProfesseurs(professeursReqData, (err, professeurs)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'professeurs Created Successfully', data: professeurs.insertId})
        })
    }
}
 
 
// get  by ID  for Update 
exports.getProfesseursByID = (req, res)=>{
    ProfesseursModel.getProfesseursByID(req.params.id, (err, professeurs)=>{
        if(err)
        res.send(err);
        console.log('single professeurs data' , professeurs);
        res.send(JSON.stringify({ status: 200, error: null, response: professeurs }));
    })
}
 
 
// update 
exports.updateProfesseurs = (req, res)=>{
    const professeursReqData = new ProfesseursModel(req.body);
    console.log('professeursReqData update', professeursReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        ProfesseursModel.updateProfesseurs(req.params.id, professeursReqData, (err, professeurs)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'professeurs updated Successfully'})
        })
    }
}
 
// delete 
exports.deleteProfesseurs = (req, res)=>{
    ProfesseursModel.deleteProfesseurs(req.params.id, (err, professeurs)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'professeurs deleted successully!'});
    })
}