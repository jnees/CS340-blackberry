import { React } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrganizationsButtonsGroup from '../button_groups/organizations_buttons';
const axios = require('axios').default;

// Delete confirmation page for species
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const OrganizationsDeleteForm = () => {

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        const msg = toast.loading("Deleting record...");
        event.preventDefault();
        axios({
            method: "delete",
            url: "/api/organizations",
            data: {id}
        })
            .then((res) => {
                if(res.status !== 200){
                    toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
                } else {
                    navigate("/organizations/success");
                }
                
            })
            .catch((err) => {
                toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
            })
    }

    // Get id from url
    const { id, name, type } = useParams();

    return (
        <div class="container">
            <h1 class="text-center">Delete Organization</h1>
            <OrganizationsButtonsGroup />
            <ToastContainer />
            <div class="container text-left">
                <div class="row">
                    <div class="col">
                        <h2>{"Delete this record?"}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">Organization ID</p>
                    </div>
                    <div class="col-sm">
                        <p>{id}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">Name</p>
                    </div>
                    <div class="col-sm">
                        <p>{name}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">Type</p>
                    </div>
                    <div class="col-sm">
                        <p>{type}</p>
                    </div>
                </div>
            
            
                <button onClick={(e) => {handleSubmit(e)}} 
                    type="submit" class="btn btn-danger">Delete record</button>
            </div>

        </div>    
    )
    
}

export default OrganizationsDeleteForm
