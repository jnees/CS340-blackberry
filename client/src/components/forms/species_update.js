import {React, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpeciesButtonsGroup from '../button_groups/species_buttons';
const axios = require('axios').default;

// Form for modifying a record in the species table. Prepopulates the existing record.
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const SpeciesUpdateForm = () => {

    let navigate = useNavigate();

    // Get id from url
    const { id, name, description} = useParams();

    // Initialize state
    const [newName, setName] = useState(name);
    const [newDescription, setDescription] = useState(description)

    const handleSubmit = async (event) => {
        const msg = toast.loading("Updating record...");

        // Validate name
        if(newName === ""){
            toast.update(msg, { render: "Species must have a name!", type: "error", isLoading: false, autoClose: 3000});
            return
        }

        if(newDescription === ""){
            toast.update(msg, { render: "Species must have a description!", type: "error", isLoading: false, autoClose: 3000});
            return
        }
        
        event.preventDefault();
        axios({
            method: "put",
            url: "/api/species",
            data: {id, newName, newDescription}
        })
            .then((res) => {
                if (res.status !== 200){
                    toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
                } else {
                    navigate("/species/success");
                }
            })
            .catch((err) => {
                toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
            });
    }

    return (
        <div>
        <h1 class="text-center">Update Species</h1>
        <SpeciesButtonsGroup />
        <ToastContainer />
        <div class="container">
            <p>{"Update record for species_id " + id + " :"}</p>
        </div>

        <div class="container">
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input 
                        type="text" class="form-control" 
                        id="name" value={newName} 
                        onChange={e => setName(e.target.value)}   
                    />
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <input 
                        type="text" class="form-control" 
                        id="description" value={newDescription} 
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <button onClick={(e) => {handleSubmit(e)}} type="submit" 
                    class="btn btn-warning">Edit record</button>
            </form>
            </div>
    </div>
    )
    
}

export default SpeciesUpdateForm
