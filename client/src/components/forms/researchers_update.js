import {React, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResearchersButtonsGroup from '../button_groups/researchers_buttons';
const axios = require('axios').default;

// Form for modifying a record in the species table. Prepopulates the existing record.
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const ResearchersUpdateForm = () => {

    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        const msg = toast.loading("Updating record...");
        
        event.preventDefault();
        axios({
            method: "put",
            url: "/api/researchers",
            data: {id, newFirstName, newLastName, newEmail, newOrganization}
        })
            .then((res) => {
                if (res.status !== 200){
                    toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
                } else {
                    navigate("/researchers/success");
                }
            })
            .catch((err) => {
                toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
            });
    }

    // Get id from url
    const { id, first_name, last_name, email, organization_id} = useParams();

    // Initialize state
    const [newFirstName, setFirstName] = useState(first_name);
    const [newLastName, setLastName] = useState(last_name)
    const [newEmail, setEmail] = useState(email)
    const [newOrganization, setOrganization] = useState(organization_id)

    return (
        <div>
        <h1 class="text-center">Update Researcher</h1>
        <ResearchersButtonsGroup />
        <ToastContainer />
        <div class="container">
            <p>{"Update record for researcher_id " + id + " :"}</p>
        </div>

        <div class="container">
            <form>
                <div class="mb-3">
                    <label for="first_name" class="form-label">First Name</label>
                    <input 
                        type="text" class="form-control" 
                        id="first_name" value={newFirstName} 
                        onChange={e => setFirstName(e.target.value)}   
                    />
                </div>
                <div class="mb-3">
                    <label for="last_name" class="form-label">Last Name</label>
                    <input 
                        type="text" class="form-control" 
                        id="last_name" value={newLastName} 
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email </label>
                    <input 
                        type="text" class="form-control" 
                        id="email" value={newEmail} 
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="organization_id" class="form-label">Organization ID</label>
                    <input 
                        type="number" class="form-control" 
                        id="organization_id" value={newOrganization} 
                        onChange={e => setOrganization(e.target.value)}
                    />
                </div>
                <button onClick={(e) => {handleSubmit(e)}} type="submit" 
                    class="btn btn-warning">Edit record</button>
            </form>
            </div>
    </div>
    )
    
}

export default ResearchersUpdateForm
