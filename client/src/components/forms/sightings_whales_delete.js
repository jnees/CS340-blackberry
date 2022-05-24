import { React } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SightingsWhalesButtonsGroup from '../button_groups/sightings_whales_buttons';
const axios = require('axios').default;

// Delete confirmation page for species
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const SightingsWhalesDeleteForm = () => {

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        const msg = toast.loading("Deleting record...");
        event.preventDefault();
        axios({
            method: "delete",
            url: "/api/sightings_whales",
            data: {id}
        })
            .then((res) => {
                if(res.status !== 200){
                    toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
                } else {
                    navigate("/sightings_whales/success");
                }
                
            })
            .catch((err) => {
                toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
            })
    }

    // Get id from url
    const { id, sighting_id, whale_name } = useParams();

    return (
        <div class="container">
            <h1 class="text-center">Delete Sighting_Whale</h1>
            <SightingsWhalesButtonsGroup />
            <ToastContainer />
            <div class="container text-left">
                <div class="row">
                    <div class="col">
                        <h2>{"Delete this record?"}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">Sighting_Whale ID</p>
                    </div>
                    <div class="col-sm">
                        <p>{id}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">Sighting ID</p>
                    </div>
                    <div class="col-sm">
                        <p>{sighting_id}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">Whale Name</p>
                    </div>
                    <div class="col-sm">
                        <p>{whale_name}</p>
                    </div>
                </div>
                <button onClick={(e) => {handleSubmit(e)}} 
                    type="submit" class="btn btn-danger">Delete record</button>
            </div>

        </div>    
    )
    
}

export default SightingsWhalesDeleteForm
