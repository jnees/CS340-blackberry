import { React } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpeciesButtonsGroup from '../button_groups/species_buttons';
const axios = require('axios').default;

// Delete confirmation page for species
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const SpeciesDeleteForm = () => {

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        const msg = toast.loading("Deleting record...");
        event.preventDefault();
        axios({
            method: "delete",
            url: "/api/species",
            data: {id}
        })
            .then((res) => {
                if(res.status !== 200){
                    toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
                } else {
                    navigate("/species/success");
                }
                
            })
            .catch((err) => {
                toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
            })
    }

    // Get id from url
    const { id, name, description } = useParams();

    return (
        <div class="container">
            <h1 class="text-center">Delete Species</h1>
            <SpeciesButtonsGroup />
            <ToastContainer />
            <div class="container text-left">
                <div class="row">
                    <div class="col">
                        <h2>{"Delete this record?"}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">Species ID</p>
                    </div>
                    <div class="col-sm">
                        <p>{id}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">Name</p>
                    </div>
                    <div class="col-sm">
                        <p>{name}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">Description</p>
                    </div>
                    <div class="col-sm">
                        <p>{description}</p>
                    </div>
                </div>
                <button onClick={(e) => {handleSubmit(e)}} 
                    type="submit" class="btn btn-danger">Delete record</button>
            </div>

        </div>    
    )
    
}

export default SpeciesDeleteForm
