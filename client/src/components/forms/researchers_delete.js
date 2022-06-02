import { React } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResearchersButtonsGroup from '../button_groups/researchers_buttons';
const axios = require('axios').default;

// Delete confirmation page for researchers
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const ResearchersDeleteForm = () => {

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        const msg = toast.loading("Deleting record...");
        event.preventDefault();
        axios({
            method: "delete",
            url: "/api/researchers",
            data: {id}
        })
            .then((res) => {
                if(res.status !== 200){
                    toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
                } else {
                    navigate("/researchers/success");
                }
                
            })
            .catch((err) => {
                toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
            })
    }

    // Get id from url
    const { id, first_name, last_name, email, organization_id } = useParams();

    return (
        <div class="container">
            <h1 class="text-center">Delete Researcher</h1>
            <ResearchersButtonsGroup />
            <ToastContainer />
            <div class="container text-left">
                <div class="row">
                    <div class="col">
                        <h2>{"Delete this record?"}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">Researcher ID</p>
                    </div>
                    <div class="col-sm">
                        <p>{id}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">First Name</p>
                    </div>
                    <div class="col-sm">
                        <p>{first_name}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">Last Name</p>
                    </div>
                    <div class="col-sm">
                        <p>{last_name}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">Email</p>
                    </div>
                    <div class="col-sm">
                        <p>{email}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">Organization ID</p>
                    </div>
                    <div class="col-sm">
                        <p>{organization_id}</p>
                    </div>
                </div>
                <button onClick={(e) => {handleSubmit(e)}} 
                    type="submit" class="btn btn-danger">Delete record</button>
            </div>

        </div>    
    )
    
}

export default ResearchersDeleteForm
