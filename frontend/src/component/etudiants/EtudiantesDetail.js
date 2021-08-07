import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function EtudiantsDetail() {
    const [search, setSearch] = useState('');
    const [record, setRecord] = useState([]);

    const [user, setUser] = useState({
        nom_complet: "",
        cin: "",
        date_de_naissance: "",
        filiere: "",
        date_inscription: "",
        modules: ""
    });

    //  Object Destructuring 
    const { nom_complet, cin, date_de_naissance, filiere, date_inscription, modules } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // On Page load display all records 
    const loadEmployeeDetail = async () => {
        var response = fetch('http://localhost:5000/api/etudiants')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setRecord(myJson);
            });
    }
    useEffect(() => {
        loadEmployeeDetail();
    }, []);

    // Insert Employee Records 
    const submitEmployeeRecord = async (e) => {
        e.preventDefault();
        e.target.reset();
        await axios.post("http://localhost:5000/api/etudiants", user);
        alert('Data Inserted');

        loadEmployeeDetail();
    };

    // Search Records here 
    const searchRecords = () => {
        alert(search)
        axios.get(`http://localhost:5000/api/etudiants/searchRecord/${search}`)
            .then(response => {
                setRecord(response.data);
            });
    }

    // Delete Employee Record
    const deleteRecord = (productId) => {
        axios.delete(`http://localhost:5000/api/etudiants/${productId}`)
            .then((result) => {
                loadEmployeeDetail();
            })
            .catch(() => {
                alert('Error in the Code');
            });
    };

    return (
        <section>
            <nav class="navbar navbar-expand-lg navbar-light bg-dark">
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item active ">
                            sssssssss
                        </li>
                        <li class="nav-item">
                        <Link lass="nav-link text-white"  to={`./ProfesseursDetail`}>
                            <a class="nav-link text-white">Professeurs</a></Link>
                        </li>

                        <li class="nav-item">
                        <Link lass="nav-link text-white"  to={`./`}>
                            <a class="nav-link text-white">Etudiants</a></Link>
                        </li>
                         
                        <li class="nav-item">
                        <Link lass="nav-link text-white"  to={`./ModuleDetail`}>
                            <a class="nav-link text-white">Module</a></Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div class="container">

                <h4 className="mb-3 text-center mt-4">CRUD Operation in MERN</h4>
                <div class="row mt-3">
                    <div class="col-sm-4">
                        <div className="box p-3 mb-3 mt-5" style={{ border: "1px solid #d0d0d0" }}>
                            <form onSubmit={submitEmployeeRecord}>
                                <h5 className="mb-3 ">Insert Employee Records</h5>
                                <div class="form-group">
                                    <input type="text" class="form-control  mb-4" name="nom_complet"
                                        value={nom_complet} onChange={e => onInputChange(e)} placeholder="Enter nom complet" required="" />
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control  mb-4" name="cin"
                                        value={cin} onChange={e => onInputChange(e)} placeholder="Enter cin" required="" />
                                </div>

                                <div class="form-group">
                                    <input type="date" class="form-control mb-4" name="date_de_naissance"
                                        value={date_de_naissance} onChange={e => onInputChange(e)} placeholder="Enter date de naissance" required="" />
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control mb-4" name="filiere"
                                        value={filiere} onChange={e => onInputChange(e)} placeholder="Enter filiere" required="" />
                                </div>

                                <div class="form-group">
                                    <input type="date" class="form-control mb-2" name="date_inscription"
                                        value={date_inscription} onChange={e => onInputChange(e)} placeholder="Enter date de inscription" required="" />
                                </div>


                                <div class="form-group">
                                    <input type="text" class="form-control mb-2" name="modules"
                                        value={modules} onChange={e => onInputChange(e)} placeholder="Enter date de inscription" required="" />
                                </div>
                                {/* <div class="form-group">
                                    <input type="text" class="form-control mb-2" name="modules"
                                        value={modules} onChange={e => onInputChange(e)} placeholder="Enter Modules " required="" />
                                </div> */}

                                <button type="submit" class="btn btn-primary btn-block mt-4">Insert Record</button>
                            </form>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <h5 class="text-center  ml-4 mt-4  mb-5">View Records</h5>
                        <div class="input-group mb-4 mt-3">
                            <div class="form-outline">
                                <input type="text" id="form1" onChange={(e) => setSearch(e.target.value)} class="form-control" placeholder="Search Employee Here" style={{ backgroundColor: "#ececec" }} />
                            </div>
                            <button type="button" onClick={searchRecords} class="btn btn-success">
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                        <table class="table table-hover  table-striped table-bordered ml-4 ">
                            <thead>
                                <tr>
                                <th>id</th>
                                    <th>nom complet</th>
                                    <th>cin</th>
                                    <th>date de naissance</th>
                                    <th>filiere</th>
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
                                        <td>{name.cin}</td>
                                        <td>{name.date_de_naissance}</td>
                                        <td>{name.filiere}</td>
                                        <td>{name.date_inscription}</td>
                                        <td>{name.modules}</td>
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

                                            <Link class=" mr-2" to={`/EditEtudiants/editID/${name.id}`}>
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

export default EtudiantsDetail;