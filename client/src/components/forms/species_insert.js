import { React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpeciesButtonsGroup from '../button_groups/species_buttons';
const axios = require('axios').default;

// Form for inserting records into the species table.
const SpeciesInsertForm = () => {
    
    let navigate = useNavigate();

    // Initialize state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const clearState = () => {
        setName("");
        setDescription("");
    }

    const handleSubmit = async (event) => {
        const msg = toast.loading("Adding record...");
        event.preventDefault();

        // Validate name
        if(name === ""){
            toast.update(msg, { render: "Species must have a name!", type: "error", isLoading: false, autoClose: 3000});
            return
        }

        if(description === ""){
            toast.update(msg, { render: "Species must have a description!", type: "error", isLoading: false, autoClose: 3000});
            return
        }

        axios({
            method: "post",
            url: "/api/species",
            data: {name, description}
        })
            .then((res) => {
                clearState();
                navigate("/species/success");
            })
            .catch((err) => {
                toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000})
            })
    }

    return (
        <div>
            <h1 class="text-center">Add New Species</h1>
            <SpeciesButtonsGroup />
            <ToastContainer />
            <div class="container">
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name"
                        value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <input type="text" class="form-control" id="description" 
                        value={description} onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <button onClick={(e) => {handleSubmit(e)}} type="submit" 
                    class="btn btn-primary">Add record</button>
            </form>
            </div>
        </div>
    ) 
  }


export default SpeciesInsertForm