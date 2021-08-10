import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import EditModules from './component/modules/EditModules';
import ModulesDetail from './component/modules/ModulesDetail';
import EditEtudiants from './component/etudiants/EditEtudiants';
import EtudiantsDetail from './component/etudiants/EtudiantesDetail';
import EditProfesseurs from './component/professeurs/EditProfesseurs';
import ProfesseursDetail from './component/professeurs/ProfesseursDetails';
import Register from "./component/register/Register";
import Login from "./component/login/Login";
import Home from "./component/Home";
import PrivateRoute from "./component/PrivateRoute";
import { AuthContext } from "./component/auth/auth";


// import { BrowserRouter as Router, Route}
function App() {

  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    async function getAuthToken(token) {
      await axios
        .get("http://localhost:3001/isUserAuth", {
          headers: {
            "x-access-token": token,
          },
        })
        .then((res) => {
          if (res.data.auth) {
            setAuthToken(token);
          } else {
            localStorage.removeItem("token");
            setAuthToken(null);
          }
        })
        .catch((err) => {
          console.log(err);
          setAuthToken(null);
          localStorage.removeItem("token");
        });
    }
    const token = localStorage.getItem("token");
    if (token) {
      getAuthToken(token);
    }
  }, []);

  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  };

  return (

    <Router>
      <div className="App">
        <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
          <Router>
            <div>
              <PrivateRoute path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/ProfesseursDetail" component={ProfesseursDetail} />
              <Route exact path="/ModuleDetail" component={ModulesDetail} />
              <Route exact path="/EtudiantsDetail" component={EtudiantsDetail} />
              <Route exact path="/EditModules/editID/:id" component={EditModules} />
              <Route exact path="/EditEtudiants/editID/:id" component={EditEtudiants} />
              <Route exact path="/EditProfesseurs/editID/:id" component={EditProfesseurs} />
            </div>
          </Router>
        </AuthContext.Provider>
      </div>
    </Router>

  );
}

export default App;