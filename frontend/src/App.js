import './App.css';
// import EmployeeDetail from './component/employeer/EmployeeDetails';
// import EditEmployee from './component/employeer/EditEmployee';
import EditModules from './component/modules/EditModules';
import ModulesDetail from './component/modules/ModulesDetail';
import EditEtudiants from './component/etudiants/EditEtudiants';
import EtudiantsDetail from './component/etudiants/EtudiantesDetail';
import EditProfesseurs from './component/professeurs/EditProfesseurs';
import ProfesseursDetail from './component/professeurs/ProfesseursDetails';

import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
function App(props) {
  return (

    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/ProfesseursDetail" component={ProfesseursDetail} />
          <Route exact path="/ModuleDetail" component={ModulesDetail} /> 
          <Route exact path="/" component={EtudiantsDetail} />
          {/* <Route exact path="/EmployeeDetail" component={EmployeeDetail} /> */}
          {/* <Route exact path="/EditModules/editID/:id" component={EditEmployee} />  */}
          <Route exact path="/EditModules/editID/:id" component={EditModules} /> 
          <Route exact path="/EditEtudiants/editID/:id" component={EditEtudiants} />
          <Route exact path="/EditProfesseurs/editID/:id" component={EditProfesseurs} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;