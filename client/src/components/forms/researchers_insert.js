import { React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResearchersButtonsGroup from '../button_groups/researchers_buttons';
const axios = require('axios').default;

// Form for inserting records into the researchers table.
const ResearchersInsertForm = () => {
    
    let navigate = useNavigate();

    // Initialize state
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [organization_id, setOrganizationID] = useState("");
    const [orgs_list, setOrgsList] = useState([]);

    const clearState = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setOrganizationID("");
    }

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
        const msg = toast.loading("Adding record...");
        event.preventDefault();

        // Validate Name
        if (first_name === "" || last_name === "") {
            return toast.update(msg, { render: "Must enter a first and last name!", type: "error", isLoading: false, autoClose: 3000});
        }

        // Validate email
        // CITATION: REGEX pattern for email source: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
       const  mailformat =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
        if (email === "" || !email.match(mailformat)) {
            return toast.update(msg, { render: "Must enter a a valid email address!", type: "error", isLoading: false, autoClose: 3000});
        }

        // Validate Organization
        if (organization_id === ""){
            return toast.update(msg, { render: "Must select an organization!", type: "error", isLoading: false, autoClose: 3000});
        }

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
                    <select onChange={e => setOrganizationID(e.target.value)} class="form-control" id="organization_id">
                        <option></option>
                        {orgs_list.map(org =>
                            <option 
                                key={org.organization_id} 
                                value={org.organization_id}
                            >{org.organization_id + "- " + org.name}</option>
                        )}
                    </select>
                </div>
                <button onClick={(e) => {handleSubmit(e)}} type="submit" 
                    class="btn btn-primary">Add record</button>
            </form>
            </div>
        </div>
    ) 
  }


export default ResearchersInsertForm