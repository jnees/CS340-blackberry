import { React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SightingsButtonsGroup from '../button_groups/researchers_buttons';
const axios = require('axios').default;

// Form for inserting records into the researchers table.
const SightingsInsertForm = () => {
    
    let navigate = useNavigate();

    const clearState = () => {
        setDatetime("");
        setLatitude("");
        setLongitude("");
        setWhaleName("");
        setResearcherName("")
    }

    const handleSubmit = async (event) => {
        const msg = toast.loading("Adding record...");
        event.preventDefault();
        axios({
            method: "post",
            url: "/api/sightings",
            data: {datetime, latitude, longitude, whale_name, researcher_name}
        })
            .then((res) => {
                clearState();
                navigate("/sightings/success");
            })
            .catch((err) => {
                toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000})
            })
    }

    // Initialize state
    const [datetime, setDatetime] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [whale_name, setWhaleName] = useState("");
    const [researcher_name, setResearcherName] = useState("");

    return (
        <div>
            <h1 class="text-center">Add New Sightings</h1>
            <SightingsButtonsGroup />
            <ToastContainer />
            <div class="container">
            <form>
                <div class="mb-3">
                    <label for="datetime" class="form-label">Date and Time</label>
                    <input type="text" class="form-control" id="datetime"
                        value={datetime} onChange={e => setDatetime(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="latitude" class="form-label">Latitude</label>
                    <input type="text" class="form-control" id="latitude" 
                        value={latitude} onChange={e => setLatitude(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="longitude" class="form-label">Longitude</label>
                    <input type="text" class="form-control" id="longitude" 
                        value={longitude} onChange={e => setLongitude(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="whale_name" class="form-label">Whale Name</label>
                    <input type="text" class="form-control" id="whale_name" 
                        value={whale_name} onChange={e => setWhaleName(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="researcher_name" class="form-label">Researcher Name</label>
                    <input type="text" class="form-control" id="researcher_name" 
                        value={researcher_name} onChange={e => setResearcherName(e.target.value)}
                    />
                </div>
                <button onClick={(e) => {handleSubmit(e)}} type="submit" 
                    class="btn btn-primary">Add record</button>
            </form>
            </div>
        </div>
    ) 
  }


export default SightingsInsertForm