import { React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WhalesButtonsGroup from '../button_groups/whales_buttons';
const axios = require('axios').default;


// Form for inserting records into the species table.
const WhalesInsertForm = () => {

    let navigate = useNavigate();

    // Initialize state
    const [name, setName] = useState("");
    const [birthyear, setBirthyear] = useState("");
    const [is_female, setGender] = useState("0");
    const [is_transient, setTransient] = useState("0");
    const [species_id, setSpecies] = useState("");
    const [species_list, setSpeciesList] = useState([]);

    const clearState = () => {
        setName("");
        setBirthyear("");
        setGender("");
        setTransient("");
        setSpecies("");
    }

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
        const msg = toast.loading("Adding record...");
        event.preventDefault();

        // Validate Name
        if (name === "") {
            return toast.update(msg, { render: "Must enter a valid name!", type: "error", isLoading: false, autoClose: 3000});
        }

        // Validate Year
        if (birthyear === "" || birthyear < 0) {
            return toast.update(msg, { render: "Must enter a valid birthyear!", type: "error", isLoading: false, autoClose: 3000});
        }

        // Validate Gender
        if (is_female === "") {
            return toast.update(msg, { render: "Must make a selection for is_female!", type: "error", isLoading: false, autoClose: 3000});
        }

        // Validate Transient
        if (is_transient === "") {
            return toast.update(msg, { render: "Must make a selection for is_transient!", type: "error", isLoading: false, autoClose: 3000});
        }

        // Validate Species ID
        if (species_id === "") {
            return toast.update(msg, { render: "Must make a selection for species!", type: "error", isLoading: false, autoClose: 3000});
        }

        axios({
            method: "post",
            url: "/api/whales",
            data: {name, birthyear, is_female, is_transient, species_id}
        })
            .then((res) => {
                clearState();
                navigate("/whales/success");
            })
            .catch((err) => {
                toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000})
            })
    }
    
      return (
        <div>
            <h1 class="text-center">Add New Whale</h1>
            <WhalesButtonsGroup />
            <ToastContainer />
            <div class="container">
                <form>
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" 
                            value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label for="birthyear" class="form-label">Birthyear</label>
                        <input type="number" class="form-control" id="birthyear" 
                            value={birthyear} onChange={e => setBirthyear(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="is_female" class="form-label">Is Female</label>
                        <select class="form-control" id="is_female" value={is_female}
                            onChange={e => setGender(e.target.value)}>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="is_transient" class="form-label">Is Transient</label>
                        <select class="form-control" id="is_transient" value={is_transient}
                            onChange={e => setTransient(e.target.value)}>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="species_id" class="form-label">Species ID</label>
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
                    <button onClick={(e) => {handleSubmit(e)}} type="submit" class="btn btn-primary">Add record</button>
                </form>
            </div>
        </div>
      ) 
}


export default WhalesInsertForm