import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditEtudiants = () => {

    let history = useHistory(); //The useHistory hook gives you access to the history instance that you may use to navigate.
    const { id } = useParams();  //The useParams() hook helps us to access the URL parameters from a current route. 


    const [user, setUser] = useState({
        nom_complet: "",
        cin: "",
        date_de_naissance: "",
        filiere: "",
        date_inscription: "",
        modules: ""
    })


    const { nom_complet,cin,date_de_naissance,filiere,date_inscription,modules} = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
    }, []);


    const updateEtudiants = async e => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/api/etudiants/${id}`, user);
        history.push("/");
    };

    const loadUser = () => {
        fetch(`http://localhost:5000/api/etudiants/${id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setUser({
                    id: id,
                    update: true,
                    nom_complet: result.response[0].nom_complet,
                    cin: result.response[0].cin,
                    date_de_naissance: result.response[0].date_de_naissance,
                    filiere: result.response[0].filiere,
                    date_inscription: result.response[0].date_inscription,
                    modules: result.response[0].modules
                });
            })
            .catch((error) => console.log("error", error));
    };

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
                    <h4 className="text-center mb-4">Edit A Etudiants</h4>

                    <h5 className="text-success">Etudiants ID : {user.id} </h5>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter nom complet"
                            name="nom_complet"
                            value={nom_complet}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter cin"
                            name="cin"
                            value={cin}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="date"
                            className="form-control form-control-lg"
                            placeholder="Enter votre date de naissance"
                            name="date_de_naissance"
                            value={date_de_naissance}
                            onChange={e => onInputChange(e)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter la filiere"
                            name="filiere"
                            value={filiere}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="date"
                            className="form-control form-control-lg"
                            placeholder="Enter  date d'inscription"
                            name="date_inscription"
                            value={date_inscription}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter nom Modules"
                            name="modules"
                            value={modules}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <button onClick={updateEtudiants} className="btn btn-secondary btn-block">Update Employee</button>

                </div>
            </div>
        </div>
    );
};

export default EditEtudiants;