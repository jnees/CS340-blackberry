import {React, useEffect, useState} from 'react';
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

    // Get id from url
    const { id, name, birthyear, is_female, is_transient, species_id} = useParams();

    // Initialize state
    const [newName, setName] = useState(name);
    const [newBirthyear, setBirthyear] = useState(birthyear)
    const [newGender, setGender] = useState(is_female)
    const [newTransient, setTransient] = useState(is_transient)
    const [newSpecies, setSpecies] = useState(species_id)
    const [species_list, setSpeciesList] = useState([]);

    useEffect(() => {
        getSpeciesList();
    }, [])

    const getSpeciesList = async () => {
        axios({
            method: "get", url: "/api/species",
        })
            .then((res) => {
                setSpeciesList(res.data);
            })
            .catch((err) => {
                toast.error('Error getting species names', {});
            })
    }   

    const handleSubmit = async (event) => {
        const msg = toast.loading("Updating record...");
        event.preventDefault();

        // Validate Name
        if (newName === "") {
            return toast.update(msg, { render: "Must enter a valid name!", type: "error", isLoading: false, autoClose: 3000});
        }

        // Validate Year
        if (newBirthyear === "" || newBirthyear < 0) {
            return toast.update(msg, { render: "Must enter a valid birthyear!", type: "error", isLoading: false, autoClose: 3000});
        }

        // Validate Gender
        if (newGender === "") {
            return toast.update(msg, { render: "Must make a selection for is_female!", type: "error", isLoading: false, autoClose: 3000});
        }

        // Validate Transient
        if (newTransient === "") {
            return toast.update(msg, { render: "Must make a selection for is_transient!", type: "error", isLoading: false, autoClose: 3000});
        }

        // Validate Species ID
        if (newSpecies === "") {
            return toast.update(msg, { render: "Must make a selection for species!", type: "error", isLoading: false, autoClose: 3000});
        }

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
                    <select class="form-control" id="is_female" value={newGender}
                        onChange={e => setGender(e.target.value)}>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="is_transient" class="form-label">Is Transient</label>
                    <select class="form-control" id="is_transient" value={newTransient}
                        onChange={e => setTransient(e.target.value)}>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="species" class="form-label">Species ID</label>
                    <select onChange={e => setSpecies(e.target.value)} class="form-control" id="species_id">
                        <option></option>
                        {species_list.map(species =>
                            <option 
                                key={species.species_id} 
                                value={species.species_id}
                            >{species.species_id + "- " + species.name}</option>
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

export default WhalesUpdateForm
