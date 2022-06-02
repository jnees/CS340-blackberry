import {React, useEffect, useState} from 'react';
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

    // Get id from url
    const { id, sighting_id, whale_name} = useParams();

    // Initialize state
    const [newSightingID, setSightingID] = useState(sighting_id);
    const [newWhaleName, setWhaleName] = useState(whale_name);
    const [whale_list, setWhaleList] = useState([]);
    const [sightings_list, setSightingsList] = useState([]);

    useEffect(() => {
        getWhaleData();
        getSightingsData();
    }, [])

    const getWhaleData = async () => {
        axios({
            method: "get", url: "/api/whales",
        })
            .then((res) => {
                setWhaleList(res.data);
            })
            .catch((err) => {
                toast.error('Error getting whale names', {});
            })
    }

    const getSightingsData = async () => {
        axios({
            method: "get", url: "/api/sightings",
        })
            .then((res) => {
                setSightingsList(res.data);
            })
            .catch((err) => {
                toast.error('Error getting sightings list', {});
            })
    }

    const handleSubmit = async (event) => {
        const msg = toast.loading("Updating record...");
        event.preventDefault();

        // Validate whale selected
        if (whale_name === "") {
            return toast.update(msg, { render: "Must select a whale!", type: "error", isLoading: false, autoClose: 3000});
        }

        // Validate sighting selected
        if (sighting_id === "") {
            return toast.update(msg, { render: "Must select a sighting!", type: "error", isLoading: false, autoClose: 3000});
        }
        
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
                        <select onChange={e => setSightingID(e.target.value)} class="form-control" id="sighting_id">
                            <option></option>
                            {sightings_list.map(sighting =>
                                <option 
                                    key={sighting.sighting_id} 
                                    value={sighting.sighting_id}
                                >{sighting.sighting_id + ": " + Date(sighting.datetime) + " " + sighting.researcher_name}</option>
                            )}
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlSelect1">Whale Name</label>
                        <select onChange={e => setWhaleName(e.target.value)} class="form-control" id="whale_name">
                            <option></option>
                            {whale_list.map(whale =>
                                <option 
                                    key={whale.whale_id} 
                                    value={whale.name}
                                >{whale.whale_id + "- " + whale.name}</option>
                            )}
                        </select>
                    </div>
                    <button onClick={(e) => {handleSubmit(e)}} type="submit" 
                        class="btn btn-primary">Save</button>
                </form>
            </div>
        </div>
    )
    
}

export default SightingsWhalesUpdateForm
