import { React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SightingsWhalesButtonsGroup from '../button_groups/sightings_whales_buttons';
const axios = require('axios').default;

// Form for inserting records into the researchers table.
const SightingsWhalesInsertForm = () => {
    
    let navigate = useNavigate();

    const clearState = () => {
        setSightingID("");
        setWhaleName("");
    }

    const handleSubmit = async (event) => {
        const msg = toast.loading("Adding record...");
        event.preventDefault();
        axios({
            method: "post",
            url: "/api/sightings_whales",
            data: {sighting_id, whale_name}
        })
            .then((res) => {
                clearState();
                navigate("/sightings_whales/success");
            })
            .catch((err) => {
                toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000})
            })
    }

    // Initialize state
    const [sighting_id, setSightingID] = useState("");
    const [whale_name, setWhaleName] = useState("");

    return (
        <div>
            <h1 class="text-center">Add New Sighting_Whale</h1>
            <SightingsWhalesButtonsGroup />
            <ToastContainer />
            <div class="container">
            <form>
                <div class="mb-3">
                    <label for="sighting_id" class="form-label">Sighting ID</label>
                    <input type="number" class="form-control" id="sighting_id" min="1"
                        value={sighting_id} onChange={e => setSightingID(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="whale_name" class="form-label">Whale Name</label>
                    <input type="text" class="form-control" id="whale_name" 
                        value={whale_name} onChange={e => setWhaleName(e.target.value)}
                    />
                </div>
                <button onClick={(e) => {handleSubmit(e)}} type="submit" 
                    class="btn btn-primary">Add record</button>
            </form>
            </div>
        </div>
    ) 
  }


export default SightingsWhalesInsertForm