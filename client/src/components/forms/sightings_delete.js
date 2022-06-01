import { React } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SightingsButtonsGroup from '../button_groups/sightings_buttons';
const axios = require('axios').default;

// Delete confirmation page for sightings
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const SightingsDeleteForm = () => {

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        const msg = toast.loading("Deleting record...");
        event.preventDefault();
        axios({
            method: "delete",
            url: "/api/sightings",
            data: {id}
        })
            .then((res) => {
                if(res.status !== 200){
                    toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
                } else {
                    navigate("/sightings/success");
                }
                
            })
            .catch((err) => {
                toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
            })
    }

    // Get id from url
    const { id, datetime, latitude, longitude, researcher_name } = useParams();

    return (
        <div class="container">
            <h1 class="text-center">Delete Sighting</h1>
            <SightingsButtonsGroup />
            <ToastContainer />
            <div class="container text-left">
                <div class="row">
                    <div class="col">
                        <h2>{"Delete this record?"}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">Sighting ID</p>
                    </div>
                    <div class="col-sm">
                        <p>{id}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">Date and Time</p>
                    </div>
                    <div class="col-sm">
                        <p>{datetime}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">Latitude</p>
                    </div>
                    <div class="col-sm">
                        <p>{latitude}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">Longitude</p>
                    </div>
                    <div class="col-sm">
                        <p>{longitude}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">Researcher Name</p>
                    </div>
                    <div class="col-sm">
                        <p>{researcher_name}</p>
                    </div>
                </div>
                <button onClick={(e) => {handleSubmit(e)}} 
                    type="submit" class="btn btn-danger">Delete record</button>
            </div>

        </div>    
    )
    
}

export default SightingsDeleteForm
