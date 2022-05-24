import {React, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SightingsWhalesButtonsGroup from '../button_groups/sightings_whales_buttons';
const axios = require('axios').default;

// Form for modifying a record in the sightings_whales table. Prepopulates the existing record.
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const SightingsWhalesUpdateForm = () => {

    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        const msg = toast.loading("Updating record...");
        
        event.preventDefault();
        axios({
            method: "put",
            url: "/api/sightings_whales",
            data: {id, newSightingID, newWhaleName}
        })
            .then((res) => {
                if (res.status !== 200){
                    toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
                } else {
                    navigate("/sightings_whales/success");
                }
            })
            .catch((err) => {
                toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
            });
    }

    // Get id from url
    const { id, sighting_id, whale_name} = useParams();

    // Initialize state
    const [newSightingID, setSightingID] = useState(sighting_id);
    const [newWhaleName, setWhaleName] = useState(whale_name)

    return (
        <div>
        <h1 class="text-center">Update Sighting_Whale</h1>
        <SightingsWhalesButtonsGroup />
        <ToastContainer />
        <div class="container">
            <p>{"Update record for sighting_whale_id " + id + " :"}</p>
        </div>

        <div class="container">
            <form>
                <div class="mb-3">
                    <label for="sighting_id" class="form-label">Sighting ID</label>
                    <input 
                        type="text" class="form-control" 
                        id="sighting_id" value={newSightingID} 
                        onChange={e => setSightingID(e.target.value)}   
                    />
                </div>
                <div class="mb-3">
                    <label for="whale_name" class="form-label">Whale Name</label>
                    <input 
                        type="text" class="form-control" 
                        id="whale_name" value={newWhaleName} 
                        onChange={e => setWhaleName(e.target.value)}
                    />
                </div>
                <button onClick={(e) => {handleSubmit(e)}} type="submit" 
                    class="btn btn-warning">Edit record</button>
            </form>
            </div>
    </div>
    )
    
}

export default SightingsWhalesUpdateForm
