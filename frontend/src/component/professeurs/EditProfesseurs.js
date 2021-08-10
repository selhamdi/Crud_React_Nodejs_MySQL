import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditProfesseurs = () => {

    let history = useHistory(); //The useHistory hook gives you access to the history instance that you may use to navigate.
    const { id } = useParams();  //The useParams() hook helps us to access the URL parameters from a current route. 


    const [user, setUser] = useState({
        matricule: "",
        nom_complet: "",
        date_inscription: "",
        modules_enseigner: ""
    })


    const { matricule , nom_complet, date_inscription, modules_enseigner} = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
    }, []);


    const updateProfesseurs = async e => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/api/professeurs/${id}`, user);
        history.push("/");
    };

    const loadUser = () => {
        fetch(`http://localhost:5000/api/professeurs/${id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setUser({
                    id: id,
                    update: true,
                    matricule: result.response[0].matricule,
                    nom_complet: result.response[0].nom_complet,
                    date_inscription: result.response[0].date_inscription,
                    modules_enseigner: result.response[0].modules_enseigner
                });
            })
            .catch((error) => console.log("error", error));
    };

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
                    <h4 className="text-center mb-4">Edit A Professeurs</h4>

                    <h5 className="text-success">Professeurs ID : {user.id} </h5>

                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter matricule"
                            name="matricule"
                           
                            value={matricule}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
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
                            type="date"
                            className="form-control form-control-lg"
                            placeholder="Enter date d'inscription "
                            name="date_inscription"
                            value={date_inscription}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter modules enseigner"
                            name="modules_enseigner"
                            value={modules_enseigner}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <button onClick={updateProfesseurs} className="btn btn-secondary btn-block">Update Professeurs</button>

                </div>
            </div>
        </div>
    );
};

export default EditProfesseurs;