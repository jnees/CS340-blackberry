import { React } from 'react';
import { useParams } from 'react-router-dom';
import ResearchersButtonsGroup from '../button_groups/researchers_buttons';

// Delete confirmation page for species
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const ResearchersDeleteForm = () => {

    // Get id from url
    const { id, first_name, last_name, email, organization_id } = useParams();

    return (
        <div class="container">
            <h1 class="text-center">Delete Researcher</h1>
            <ResearchersButtonsGroup />
            <div class="container text-left">
                <div class="row">
                    <div class="col">
                        <h2>{"Delete this record?"}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">researcher_id</p>
                    </div>
                    <div class="col-sm">
                        <p>{id}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">first_name</p>
                    </div>
                    <div class="col-sm">
                        <p>{first_name}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">last_name</p>
                    </div>
                    <div class="col-sm">
                        <p>{last_name}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">email</p>
                    </div>
                    <div class="col-sm">
                        <p>{email}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">organization_id</p>
                    </div>
                    <div class="col-sm">
                        <p>{organization_id}</p>
                    </div>
                </div>
                <button type="submit" class="btn btn-danger">Delete record</button>
            </div>

        </div>    
    )
    
}

export default ResearchersDeleteForm
