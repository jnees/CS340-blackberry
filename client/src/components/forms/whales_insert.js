import { React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WhalesButtonsGroup from '../button_groups/whales_buttons';
const axios = require('axios').default;


// Form for inserting records into the species table.
const WhalesInsertForm = () => {

    let navigate = useNavigate();

    const clearState = () => {
        setName("");
        setBirthyear("");
        setGender("");
        setTransient("");
        setSpecies("");
    }
    
    const dataValidation = () => {
        // TODO: DATA VALIDATION
    }
    
    const handleSubmit = async (event) => {
        const msg = toast.loading("Adding record...");
        dataValidation();
        event.preventDefault();
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

    // Initialize state
    const [name, setName] = useState("");
    const [birthyear, setBirthyear] = useState("");
    const [is_female, setGender] = useState("0");
    const [is_transient, setTransient] = useState("0");
    const [species_id, setSpecies] = useState("");
    
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
                    <input type="number" class="form-control" id="species_id" 
                        value={species_id} onChange={e => setSpecies(e.target.value)}/>
                </div>
                <button onClick={(e) => {handleSubmit(e)}} type="submit" class="btn btn-primary">Add record</button>
            </form>
            </div>
        </div>
      ) 
}


export default WhalesInsertForm