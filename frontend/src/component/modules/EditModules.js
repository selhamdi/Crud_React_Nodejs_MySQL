import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
 
const EditModules = () => {
   
  let history = useHistory(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  const { id } = useParams();  //The useParams() hook helps us to access the URL parameters from a current route. 
  
 
  const [user ,setUser] = useState({
    nom_du_module:"",
    coefficient:"",
  })
 
 
  const { nom_du_module ,coefficient } = user;
 
  const onInputChange = e => {
    setUser({ ...user,[e.target.name]: e.target.value });
  };
 
  useEffect(() => {
    loadUser();
  }, []);
 
   
  const updateModules = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/v2/modules/${id}`, user);
    history.push("/");
  };
 
  const loadUser =  () => {
    fetch(`http://localhost:5000/api/v2/modules/${id}`,{
            method: "GET",
          })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
        setUser({
                    id: id,
                    update: true,
                    nom_du_module: result.response[0].nom_du_module,
                    coefficient: result.response[0].coefficient,
         
 
                });
            })
            .catch((error) => console.log("error", error));
  };
 
  return (
    <div className="container">
     <div className="row mt-4"> 
      <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
       <h4 className="text-center mb-4">Edit A Modules</h4>
       
          <h5 className="text-success">Modules ID : {user.id} </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter nom_du_modules"
              name="nom_du_module"
              value={nom_du_module}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter coefficient"
              name="coefficient"
              value={coefficient}
              onChange={e => onInputChange(e)}
            />
          </div>
       
       
      
          <button onClick={updateModules} className="btn btn-secondary btn-block">Update Modules</button>
       
       </div>
      </div> 
    </div>
  );
};
 
export default EditModules;