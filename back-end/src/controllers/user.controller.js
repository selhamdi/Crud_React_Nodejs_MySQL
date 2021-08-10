const UserModel = require('../models/user.model');
const express = require("express");
const app = express();

exports.createNewUser = (req, res) =>{
    const userReqData = new UserModel(req.body);
    console.log('userReqData',userReqDataa);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        UserModel.createUser( euserReqData, (err, user)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'user Created Successfully', data: user.insertId})
        })
    }
}

exports.createNewUserr = (req, res) =>{
    const userReqData = new UserModel(req.body);
    console.log('userReqData',userReqDataa);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        UserModel.createUser( euserReqData, (err, user)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'user Created Successfully', data: user.insertId})
        })
    }
}


const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
      res.send("token missing!");
    } else {
      jwt.verify(token, config.get("myprivatekey"), (err, decoded) => {
        if (err) {
          console.log(err);
          res.json({ auth: false, message: "Failed to authenticate" });
        } else {
          req.userId = decoded.user;
          next();
        }
      });
      res.send();
    }
  };
  
  app.get("/isUserAuth", verifyJWT, (req, res) => {
    res.send({ auth: true, message: "You are authenticated" });
  });
  
  app.get("/EtudiantsDetail", verifyJWT, (req, res) => {
    res.send({ status: 200, EtudiantsDetail });
  });