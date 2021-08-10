var dbConn  = require('../../config/db.config');
const jwt = require("jsonwebtoken");


var User = function(modules){
    this.username     =   modules.username;
    this.password      =   modules.password;
  }
 

  User.createModules= (modulesReqData, result) =>{
    dbConn.query('INSERT INTO users (username, password) VALUES (?,?)', modulesReqData, (err, res)=>{
        if(err){
            console.log('Error while inserting data');
            result(null, err);
        }else{
            console.log('modules created successfully');
            result(null, res)
        }
    })
}



User.createModules= (modulesReqData, result) =>{
    dbConn.query('INSERT INTO users (username, password) VALUES (?,?)', modulesReqData, (err, res)=>{
        if(err){
            console.log('Error while inserting data');
            result(null, err);
        }else{
            console.log('modules created successfully');
            result(null, res)
        }
    })
}

User.getUser= () =>{

    dbConn.query(
      "SELECT * from users WHERE username = ? AND password = ?",
      [username, password],
      function (err, results) {
        if (err) {
          console.log(err);
          res.send({ auth: false, error: err });
        }
        if (results.length > 0) {
          console.log(results);
          const user = results[0].username + results[0].password;
          const token = jwt.sign({ user }, config.get("myprivatekey"), {
            expiresIn: 300,
          });
          console.log(token);
          res.send({ auth: true, token: token, message: "user logged In" });
        } else {
          res.send({ auth: false, message: "Wrong username or password!" });
        }
      }
    );
  }


module.exports = User;