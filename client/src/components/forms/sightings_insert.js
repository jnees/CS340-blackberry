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
        if (latitude === "" || latitude < -90 || latitude > 90){
            return toast.update(msg, { render: "Must enter a valid latitude", type: "error", isLoading: false, autoClose: 3000});
        }

         // Validate Longitude
         if (longitude === "" || longitude < -180 || longitude > 180){
            return toast.update(msg, { render: "Must enter a valid longitude", type: "error", isLoading: false, autoClose: 3000});
        }

        // Validate Researcher
        if (researcher_name === ""){
            return toast.update(msg, { render: "Must select a valid researcher", type: "error", isLoading: false, autoClose: 3000});
        }

        axios({
            method: "post",
            url: "/api/sightings",
            data: {datetime, latitude, longitude, researcher_name}
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
                    <label for="latitude" class="form-label">Latitude (-90.000000 to 90.000000)</label>
                    <input type="text" class="form-control" id="latitude" 
                        value={latitude} onChange={e => setLatitude(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="longitude" class="form-label">Longitude (-180.000000 to 180.000000)</label>
                    <input type="text" class="form-control" id="longitude" 
                        value={longitude} onChange={e => setLongitude(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="researcher_name" class="form-label">Researcher Name</label>
                    <select onChange={e => setResearcherName(e.target.value)} class="form-control" id="researcher_name">
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
                    class="btn btn-primary">Add record</button>
            </form>
            </div>
        </div>
    ) 
  }


export default SightingsInsertForm