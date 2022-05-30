import {React, useEffect, useState} from 'react';
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

    // Get id from url
    const { id, first_name, last_name, email, organization_id} = useParams();

    // Initialize state
    const [newFirstName, setFirstName] = useState(first_name);
    const [newLastName, setLastName] = useState(last_name);
    const [newEmail, setEmail] = useState(email);
    const [newOrganization, setOrganization] = useState(organization_id === "null" ? "": organization_id);
    const [orgs_list, setOrgsList] = useState([]);

    useEffect(() => {
        getOrgsList();
    }, [])

    const getOrgsList = async () => {
        axios({
            method: "get", url: "/api/organizations",
        })
            .then((res) => {
                setOrgsList(res.data);
            })
            .catch((err) => {
                toast.error('Error getting organization names', {});
            })
    }


    const handleSubmit = async (event) => {
        const msg = toast.loading("Updating record...");
        event.preventDefault();

        // Validate Name
        if (newFirstName === "" || newLastName === "") {
            return toast.update(msg, { render: "Must enter a first and last name!", type: "error", isLoading: false, autoClose: 3000});
        }

        // Validate email
        // CITATION: REGEX pattern for email source: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
        const  mailformat =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
        if (newEmail === "" || !newEmail.match(mailformat)) {
            return toast.update(msg, { render: "Must enter a a valid email address!", type: "error", isLoading: false, autoClose: 3000});
        }

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

    const option_item = (organization_id, org_organization_id, org_name) => {
        if (org_organization_id.toString() === organization_id.toString()){
            return <option selected key={org_organization_id} value={org_organization_id}>
                {org_organization_id + "- " + org_name}</option>
        } else {
            return <option key={org_organization_id} value={org_organization_id}>
                {org_organization_id + "- " + org_name}</option>
        }
    }

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
                    <select onChange={e => setOrganization(e.target.value)} class="form-control" id="organization_id">
                        <option key="NULL" value="">NULL</option>
                        {orgs_list.map((org) =>
                            option_item(organization_id, org.organization_id, org.name)
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

export default ResearchersUpdateForm
