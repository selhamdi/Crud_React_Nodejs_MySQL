import {FaRegTrashAlt ,FaRegEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from "react";
import axios from "axios";
import { Link} from 'react-router-dom';
import {BsSearch} from "react-icons/bs";
import '../../css/navbar.css'

 
function ModulesDetail()
{
  const [search,setSearch] =useState('');
  const [record,setRecord] = useState([]);
 
  const [user, setUser] = useState({
    nom_du_module: "",
    coefficient: "",
 
  });
  
    //  Object Destructuring 
    const { nom_du_module,coefficient} = user;
    const onInputChange = e => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
     
    // On Page load display all records 
    const loadModulesDetail = async () =>  
    {
      var response = fetch('http://localhost:5000/api/v2/modules')
         .then(function(response){
            return response.json();
          })
         .then(function(myJson) {
            setRecord(myJson);
          });
    }
    useEffect(() => {
      loadModulesDetail ();
    }, []);
 
    // Insert 
    const submitModulesRecord = async (e) => {
        e.preventDefault();
        e.target.reset();
        await axios.post("http://localhost:5000/api/v2/modules",user);
        alert('Data Inserted');
         
        loadModulesDetail ();
    };
     
    // Search here 
    const searchRecords = () =>
    {
        alert(search)
        axios.get(`http://localhost:5000/api/v2/modules/searchRecord/${search}`)
        .then(response => {
          setRecord(response.data);
        });
    }
     
    // Delete Record
    const deleteRecord = (productId) =>
    {
      axios.delete(`http://localhost:5000/api/v2/modules/${productId}`)
      .then((result)=>{
        loadModulesDetail ();
      })
      .catch(()=>{
        alert('Error in the Code');
      });
    };
 
  return(
    <section>  
         <nav id="navbar" class="">
                <div class="nav-wrapper">
                    <ul id="menu">
                        <li><Link to={`./ProfesseursDetail`}>
                            Professeurs </Link></li>
                        <li><Link to={`./EtudiantsDetail`}>
                            Etudiants</Link></li>
                        <li> <Link to={`./ModuleDetail`}>
                            Module</Link></li>
                    </ul>
                </div>
            </nav>
   
    <div class="container">  
    
    <h4 className="mb-3 text-center mt-4">Table des proffesseurs</h4>
                <div class="row mt-3" style={{ margintop: "4rem!important" }}>
       <div class="col-sm-4">
          <div className="box p-3 mb-3 mt-5" style={{border:"1px solid #d0d0d0"}}>
            <form onSubmit={submitModulesRecord}> 
                <div class="form-group">
                   <input type="text" class="form-control  mb-4" name="nom_du_module"   value={nom_du_module} onChange={e => onInputChange(e)} placeholder="Enter nom du module" required=""/>
                </div>
                  
                <div class="form-group">
                   <input type="text" class="form-control  mb-4" name="coefficient" value={coefficient} onChange={e => onInputChange(e)}  placeholder="Enter Coefficient" required=""/>
                </div>
                <button type="submit" class="btn btn-primary btn-block mt-4" style={{backgroundColor:'#41106e'}}>Ajouter</button>
             </form>
        </div>
      </div>
      <div class="col-sm-8">
        <div class="input-group mb-4 mt-3">
          <div class="form-outline">
          <input type="text" id="form1" onChange={(e) => setSearch(e.target.value)} class="form-control" placeholder="Chercher module par nom" style={{ backgroundColor: "white" ,width:"280px"}} />
        </div>
        <button type="button" onClick={searchRecords} class="btn btn-success" style={{backgroundColor:'#41106e'  ,borderStyle:"none"}}>
                            <BsSearch/>                       </button>
        </div>  
        <table class="table table-hover  table-striped table-bordered ml-4 ">
            <thead>
            <tr>
                <th>ID</th>
                <th>nom_du_module</th>
                <th>coefficient</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
     
            {record.map((name)=>
                <tr>
                <td>{name.id}</td>
                <td>{name.nom_du_module}</td>
                <td>{name.coefficient}</td>
                <td>
                      <a  className="text-danger mr-2"
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you really want to delete "+ name.nom_du_module
                          )
                          if (confirmBox === true) {
                            deleteRecord(name.id)
                          }
                        }
                    }
                        > <FaRegTrashAlt /> </a>
                   
                    <Link class=" mr-2" to={`/EditModules/editID/${name.id}`}>
                    <FaRegEdit />
                    </Link>
                </td>
                </tr>
                )} 
            </tbody>
        </table>
      </div>
      </div>
    </div>
   </section>
  )
}
 
export default ModulesDetail;