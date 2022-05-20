import {React, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WhalesButtonsGroup from '../button_groups/whales_buttons';
const axios = require('axios').default;

// Form for modifying a record in the species table. Prepopulates the existing record.
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const WhalesUpdateForm = () => {

    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        const msg = toast.loading("Updating record...");
        
        dataValidation();
        event.preventDefault();
        axios({
            method: "put",
            url: "/api/whales",
            data: {id, newName, newBirthyear, newGender, newTransient, newSpecies}
        })
            .then((res) => {
                if (res.status !== 200){
                    toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
                } else {
                    navigate("/whales/success");
                }
            })
            .catch((err) => {
                toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
            });
    }

    const dataValidation = () => {
        // TODO: DATA VALIDATION
    }

    // Get id from url
    const { id, name, birthyear, is_female, is_transient, species_id} = useParams();

    // Initialize state
    const [newName, setName] = useState(name);
    const [newBirthyear, setBirthyear] = useState(birthyear)
    const [newGender, setGender] = useState(is_female)
    const [newTransient, setTransient] = useState(is_transient)
    const [newSpecies, setSpecies] = useState(species_id)


    return (
        <div>
        <h1 class="text-center">Update Whale</h1>
        <WhalesButtonsGroup />
        <ToastContainer />
        <div class="container">
            <p>{"Update record for whale_id " + id + " :"}</p>
        </div>

        <div class="container">
            <form action="/whales" method="post">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input 
                        type="text" class="form-control" 
                        id="name" value={newName} 
                        onChange={e => setName(e.target.value)}   
                    />
                </div>
                <div class="mb-3">
                    <label for="birthyear" class="form-label">Birthyear</label>
                    <input 
                        type="number" class="form-control" 
                        id="birthyear" value={newBirthyear} 
                        onChange={e => setBirthyear(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="is_female" class="form-label">Is Female</label>
                    <input 
                        type="number" class="form-control" 
                        id="is_female" value={newGender} 
                        onChange={e => setGender(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="is_transient" class="form-label">Is Transient</label>
                    <input 
                        type="number" class="form-control" 
                        id="is_transient" value={newTransient} 
                        onChange={e => setTransient(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="species" class="form-label">Species ID</label>
                    <input 
                        type="number" class="form-control" 
                        id="species" value={newSpecies} 
                        onChange={e => setSpecies(e.target.value)}
                    />
                </div>
                <button onClick={(e) => {handleSubmit(e)}} type="submit" 
                    class="btn btn-warning">Modify record</button>
            </form>
            </div>
    </div>
    )
    
}

export default WhalesUpdateForm
