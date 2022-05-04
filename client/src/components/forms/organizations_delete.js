import { React } from 'react';
import { useParams } from 'react-router-dom';
import OrganizationsButtonsGroup from '../button_groups/organizations_buttons';

// Delete confirmation page for species
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const OrganizationsDeleteForm = () => {

    // Get id from url
    const { id, name, type } = useParams();

    return (
        <div class="container">
            <h1 class="text-center">Delete Organization</h1>
            <OrganizationsButtonsGroup />
            <div class="container text-left">
                <div class="row">
                    <div class="col">
                        <h2>{"Delete this record?"}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">organization_id</p>
                    </div>
                    <div class="col-sm">
                        <p>{id}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">name</p>
                    </div>
                    <div class="col-sm">
                        <p>{name}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">type</p>
                    </div>
                    <div class="col-sm">
                        <p>{type}</p>
                    </div>
                </div>
            
            
                <button type="submit" class="btn btn-danger">Delete record</button>
            </div>

        </div>    
    )
    
}

export default OrganizationsDeleteForm
