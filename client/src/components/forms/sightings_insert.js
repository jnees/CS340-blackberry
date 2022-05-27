import { React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SightingsButtonsGroup from '../button_groups/researchers_buttons';
const axios = require('axios').default;

// Form for inserting records into the researchers table.
const SightingsInsertForm = () => {
    
    let navigate = useNavigate();

    // Initialize state
    const [datetime, setDatetime] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [researcher_name, setResearcherName] = useState("");
    const [researchers_list, setResearchersList] = useState([]);

    useEffect(() => {
        getResearchersData();
    }, [])

    const clearState = () => {
        setDatetime("");
        setLatitude("");
        setLongitude("");
        setResearcherName("")
    }

    const getResearchersData = async () => {
        axios({
            method: "get", url: "/api/researchers",
        })
            .then((res) => {
                setResearchersList(res.data);
            })
            .catch((err) => {
                toast.error('Error getting whale names', {});
            })
    }

    const handleSubmit = async (event) => {
        const msg = toast.loading("Adding record...");
        event.preventDefault();

        // Validate datetime
        if (datetime === "") {
            return toast.update(msg, { render: "Must select a date and time", type: "error", isLoading: false, autoClose: 3000});
        }

        const today = new Date();
        const input_datetime = new Date(datetime);

        if (input_datetime > today) {
            return toast.update(msg, { render: "Cannot set a future date", type: "error", isLoading: false, autoClose: 3000});
        }

        // Validate Latitude
        if (latitude === "" || latitude < 0 || latitude > 180){
            return toast.update(msg, { render: "Must enter a valid latitude", type: "error", isLoading: false, autoClose: 3000});
        }

        axios({
            method: "post",
            url: "/api/sightings",
            data: {datetime, latitude, longitude, researcher_name}
        })
            .then((res) => {
                clearState();
                navigate("/sightings/success");
            })
            .catch((err) => {
                toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000})
            })
    }

    return (
        <div>
            <h1 class="text-center">Add New Sightings</h1>
            <SightingsButtonsGroup />
            <ToastContainer />
            <div class="container">
            <form>
                <div class="mb-3">
                    <label for="datetime" class="form-label">Date and Time</label>
                    <input type="datetime-local" class="form-control" id="datetime"
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