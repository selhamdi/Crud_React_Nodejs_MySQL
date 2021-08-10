import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import {BsSearch} from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import '../../css/navbar.css'

function ProfesseursDetail() {
    const [search, setSearch] = useState('');
    const [record, setRecord] = useState([]);

    const [user, setUser] = useState({
        matricule: "",
        nom_complet: "",
        date_inscription: "",
        modules_enseigner: ""
    });

    //  Object Destructuring 
    const { matricule, nom_complet, date_inscription, modules_enseigner } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // On Page load display all records 
    const loadProfesseursDetail = async () => {
        var response = fetch('http://localhost:5000/api/professeurs')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setRecord(myJson);
            });
    }
    useEffect(() => {
        loadProfesseursDetail();
    }, []);

    // Insert 
    const submitProfesseursRecord = async (e) => {
        e.preventDefault();
        e.target.reset();
        await axios.post("http://localhost:5000/api/professeurs", user);
        alert('Data Inserted');

        loadProfesseursDetail();
    };

    // Search Records here 
    const searchRecords = () => {
        alert(search)
        axios.get(`http://localhost:5000/api/professeurs/searchRecord/${search}`)
            .then(response => {
                setRecord(response.data);
            });
    }

    // Delete 
    const deleteRecord = (productId) => {
        axios.delete(`http://localhost:5000/api/professeurs/${productId}`)
            .then((result) => {
                loadProfesseursDetail();
            })
            .catch(() => {
                alert('Error in the Code');
            });
    };

    return (
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



            <div class="menuIcon">
                <span class="icon icon-bars"></span>
                <span class="icon icon-bars overlay"></span>
            </div>


            <div class="overlay-menu">
                <ul id="menu">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
            <div class="container">

                <h4 className="mb-3 text-center mt-4">Table des proffesseurs</h4>
                <div class="row mt-3" style={{ margintop: "4rem!important" }}>
                    <div class="col-sm-4">
                        <div className="box p-3 mb-3 mt-5" style={{ border: "1px solid #41106e" }}>
                            <form onSubmit={submitProfesseursRecord}>

                                <div class="form-group">
                                    <input type="text" class="form-control  mb-4" name="matricule"
                                        value={matricule} onChange={e => onInputChange(e)} placeholder="Enter matricule" required="" />
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control  mb-4" name="nom_complet"
                                        value={nom_complet} onChange={e => onInputChange(e)} placeholder="nom_complet" required="" />
                                </div>

                                <div class="form-group">
                                    <input type="date" class="form-control mb-2" name="date_inscription"
                                        value={date_inscription} onChange={e => onInputChange(e)} placeholder="Enter date de inscription" required="" />
                                </div>


                                <div class="form-group">
                                    <input type="text" class="form-control mb-2" name="modules_enseigner"
                                        value={modules_enseigner} onChange={e => onInputChange(e)} placeholder="Modules Enseigné" required="" />
                                </div>


                                <button type="submit" class="btn btn-primary btn-block mt-4" style={{backgroundColor:'#41106e'}}>Ajouter</button>
                            </form>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="input-group mb-4 mt-3">
                            <div class="form-outline">
                                <input type="text" id="form1" onChange={(e) => setSearch(e.target.value)} class="form-control" placeholder="Chercher professeur par matricule " style={{ backgroundColor: "white" ,width:"280px"}} />
                            </div>
                            <button type="button" onClick={searchRecords} class="btn btn-success" style={{backgroundColor:'#41106e'  ,borderStyle:"none"}}>
                            <BsSearch/>                            </button>
                        </div>
                        <table class="table table-hover  table-striped table-bordered ml-4 ">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>nom complet</th>
                                    <th>matricule</th>
                                    <th>date d'inscription</th>
                                    <th>Modules</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {record.map((name) =>
                                    <tr>
                                        <td>{name.id}</td>
                                        <td>{name.nom_complet}</td>
                                        <td>{name.matricule}</td>
                                        <td>{name.date_inscription}</td>
                                        <td>{name.modules_enseigner}</td>
                                        <td>
                                            <a className="text-danger mr-2"
                                                onClick={() => {
                                                    const confirmBox = window.confirm(
                                                        "Do you really want to delete " + name.nom_complet
                                                    )
                                                    if (confirmBox === true) {
                                                        deleteRecord(name.id)
                                                    }
                                                }
                                                }
                                            > <FaRegTrashAlt /> </a>

                                            <Link class=" mr-2" to={`/EditProfesseurs/editID/${name.id}`}>
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

export default ProfesseursDetail;