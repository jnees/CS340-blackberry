import {React, useEffect, useState} from 'react';
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

    // Get id from url
    const { id, datetime, latitude, longitude, whale_name, researcher_name} = useParams();

    // Initialize state
    const [newDatetime, setDatetime] = useState(datetime);
    const [newLatitude, setLatitude] = useState(latitude);
    const [newLongitude, setLongitude] = useState(longitude);
    const [newWhaleName, setWhaleName] = useState(whale_name);
    const [newResearcherName, setResearcherName] = useState(researcher_name);
    const [researchers_list, setResearchersList] = useState([]);
    const [whales_list, setWhalesList] = useState([]);

    useEffect(() => {
        getResearchersData();
        getWhalesData();
    }, [])

    const getResearchersData = async () => {
        axios({
            method: "get", url: "/api/researchers",
        })
            .then((res) => {
                setResearchersList(res.data);
            })
            .catch((err) => {
                toast.error('Error getting researcher names', {});
            })
    }

    const getWhalesData = async () => {
        axios({
            method: "get", url: "/api/whales",
        })
            .then((res) => {
                setWhalesList(res.data);
            })
            .catch((err) => {
                toast.error('Error getting whale names', {});
            })
    }

    const handleSubmit = async (event) => {
        const msg = toast.loading("Updating record...");
        event.preventDefault();

        // Validate datetime
        if (newDatetime === "") {
            return toast.update(msg, { render: "Must select a date and time", type: "error", isLoading: false, autoClose: 3000});
        }

        const today = new Date();
        const input_datetime = new Date(newDatetime);

        if (input_datetime > today) {
            return toast.update(msg, { render: "Cannot set a future date", type: "error", isLoading: false, autoClose: 3000});
        }

        // Validate Latitude
        if (newLatitude === "" || newLatitude < -90 || newLatitude > 90){
            return toast.update(msg, { render: "Must enter a valid latitude", type: "error", isLoading: false, autoClose: 3000});
        }

        // Validate Longitude
        if (newLongitude === "" || newLongitude < -180 || newLongitude > 180){
            return toast.update(msg, { render: "Must enter a valid longitude", type: "error", isLoading: false, autoClose: 3000});
        }

        // Validate Whale name
        if (newWhaleName === ""){
            return toast.update(msg, { render: "Must select a valid whale", type: "error", isLoading: false, autoClose: 3000});
        }

        // Validate Researcher
        if (newResearcherName === ""){
            return toast.update(msg, { render: "Must select a valid researcher", type: "error", isLoading: false, autoClose: 3000});
        }


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
                    <input type="datetime-local" class="form-control" id="newDatetime"
                        value={newDatetime} onChange={e => setDatetime(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="latitude" class="form-label">Latitude (-90.000000 to 90.000000)</label>
                    <input type="text" class="form-control" id="newLatitude" 
                        value={newLatitude} onChange={e => setLatitude(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="longitude" class="form-label">Longitude (-180.000000 to 180.000000)</label>
                    <input type="text" class="form-control" id="newLongitude" 
                        value={newLongitude} onChange={e => setLongitude(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="newWhaleName" class="form-label">Whale Name</label>
                    <select onChange={e => setWhaleName(e.target.value)} class="form-control" id="newWhaleName">
                        <option></option>
                        {whales_list.map(whale =>
                            <option 
                                key={whale.whale_id} 
                                value={whale.name}
                            >{whale.whale_id + "- " + whale.name}</option>
                        )}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="newResearcherName" class="form-label">Researcher Name</label>
                    <select onChange={e => setResearcherName(e.target.value)} class="form-control" id="newResearcherName">
                        <option></option>
                        {researchers_list.map(researcher =>
                            <option 
                                key={researcher.researcher_id} 
                                value={researcher.first_name + " " + researcher.last_name}
                            >{researcher.researcher_id + "- " + researcher.first_name + " " + researcher.last_name}</option>
                        )}
                    </select>
                </div>
                <button onClick={(e) => {handleSubmit(e)}} type="submit" 
                    class="btn btn-warning">Edit record</button>
            </form>
            </div>
    </div>
    )
    
}

export default SightingsUpdateForm
