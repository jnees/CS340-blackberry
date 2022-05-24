import {React, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SightingsButtonsGroup from '../button_groups/sightings_buttons';
const axios = require('axios').default;

// Form for modifying a record in the sightings table. Prepopulates the existing record.
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const SightingsUpdateForm = () => {

    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        const msg = toast.loading("Updating record...");
        
        event.preventDefault();
        axios({
            method: "put",
            url: "/api/sightings",
            data: {id, newDatetime, newLatitude, newLongitude, newWhaleName, newResearcherName}
        })
            .then((res) => {
                if (res.status !== 200){
                    toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
                } else {
                    navigate("/sightings/success");
                }
            })
            .catch((err) => {
                toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
            });
    }

    // Get id from url
    const { id, datetime, latitude, longitude, whale_name, researcher_name} = useParams();

    // Initialize state
    const [newDatetime, setDatetime] = useState(datetime);
    const [newLatitude, setLatitude] = useState(latitude);
    const [newLongitude, setLongitude] = useState(longitude);
    const [newWhaleName, setWhaleName] = useState(whale_name);
    const [newResearcherName, setResearcherName] = useState(researcher_name);

    return (
        <div>
        <h1 class="text-center">Update Sighting</h1>
        <SightingsButtonsGroup />
        <ToastContainer />
        <div class="container">
            <p>{"Update record for sighting_id " + id + " :"}</p>
        </div>

        <div class="container">
            <form>
                <div class="mb-3">
                    <label for="datetime" class="form-label">Date and Time</label>
                    <input 
                        type="text" class="form-control" 
                        id="datetime" value={newDatetime} 
                        onChange={e => setDatetime(e.target.value)}   
                    />
                </div>
                <div class="mb-3">
                    <label for="latitude" class="form-label">Latitude</label>
                    <input 
                        type="text" class="form-control" 
                        id="latitude" value={newLatitude} 
                        onChange={e => setLatitude(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="longitude" class="form-label">Longitude</label>
                    <input 
                        type="text" class="form-control" 
                        id="longitude" value={newLongitude} 
                        onChange={e => setLongitude(e.target.value)}
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
                <div class="mb-3">
                    <label for="researcher_name" class="form-label">Researcher Name</label>
                    <input 
                        type="text" class="form-control" 
                        id="researcher_name" value={newResearcherName} 
                        onChange={e => setResearcherName(e.target.value)}
                    />
                </div>
                <button onClick={(e) => {handleSubmit(e)}} type="submit" 
                    class="btn btn-warning">Edit record</button>
            </form>
            </div>
    </div>
    )
    
}

export default SightingsUpdateForm
