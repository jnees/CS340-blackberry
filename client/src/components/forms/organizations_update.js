import {React, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrganizationsButtonsGroup from '../button_groups/organizations_buttons';
const axios = require('axios').default;

// Form for modifying a record in the species table. Prepopulates the existing record.
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const OrganizationsUpdateForm = () => {

    let navigate = useNavigate();

    // Get id from url
    const { id, name, type } = useParams();

    // Initialize state
    const [newName, setName] = useState(name);
    const [newType, setType] = useState(type)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const msg = toast.loading("Updating record...");

        // Validate name
        if(newName === ""){
            toast.update(msg, { render: "Organization must have a name!", type: "error", isLoading: false, autoClose: 3000});
            return
        }

        // Validate type
        if (newType === ""){
            toast.update(msg, { render: "Organization must have a type!", type: "error", isLoading: false, autoClose: 3000});
            return
        }
        
        axios({
            method: "put",
            url: "/api/organizations",
            data: {id, newName, newType}
        })
            .then((res) => {
                if (res.status !== 200){
                    toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
                } else {
                    navigate("/organizations/success");
                }
            })
            .catch((err) => {
                toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
            });
    }


    return (
        <div>
        <h1 class="text-center">Update Organization</h1>
        <OrganizationsButtonsGroup />
        <ToastContainer />
        <div class="container">
            <p>{"Update record for organization_id " + id + " :"}</p>
        </div>

        <div class="container">
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="newName" 
                        value={newName} onChange={e => setName(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="type" class="form-label">Type</label>
                    <select onChange={e => setType(e.target.value)} class="form-control" id="type">
                            <option>{type}</option>
                            {type !== "Educational" ? <option>Educational</option> : null}
                            {type !== "Tourism" ? <option>Tourism</option> : null}
                            {type !== "Non-Profit" ? <option>Non-Profit</option> : null}
                            {type !== "Other" ? <option>Other</option> : null}
                        </select>
                </div>
                <button onClick={(e) => {handleSubmit(e)}} 
                    type="submit" class="btn btn-primary">Edit record</button>
            </form>
            </div>
    </div>
    )
    
}

export default OrganizationsUpdateForm
