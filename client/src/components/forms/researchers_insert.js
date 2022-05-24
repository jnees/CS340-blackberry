import { React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResearchersButtonsGroup from '../button_groups/researchers_buttons';
const axios = require('axios').default;

// Form for inserting records into the researchers table.
const ResearchersInsertForm = () => {
    
    let navigate = useNavigate();

    const clearState = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setOrganizationID("");
    }

    const handleSubmit = async (event) => {
        const msg = toast.loading("Adding record...");
        event.preventDefault();
        axios({
            method: "post",
            url: "/api/researchers",
            data: {first_name, last_name, email, organization_id}
        })
            .then((res) => {
                clearState();
                navigate("/researchers/success");
            })
            .catch((err) => {
                toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000})
            })
    }

    // Initialize state
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [organization_id, setOrganizationID] = useState("");

    return (
        <div>
            <h1 class="text-center">Add New Researcher</h1>
            <ResearchersButtonsGroup />
            <ToastContainer />
            <div class="container">
            <form>
                <div class="mb-3">
                    <label for="first_name" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="first_name"
                        value={first_name} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="last_name" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="last_name" 
                        value={last_name} onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" class="form-control" id="email" 
                        value={email} onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="organization_id" class="form-label">Organization ID</label>
                    <input type="number" class="form-control" id="organization_id" 
                        value={organization_id} onChange={e => setOrganizationID(e.target.value)}
                    />
                </div>
                <button onClick={(e) => {handleSubmit(e)}} type="submit" 
                    class="btn btn-primary">Add record</button>
            </form>
            </div>
        </div>
    ) 
  }


export default ResearchersInsertForm