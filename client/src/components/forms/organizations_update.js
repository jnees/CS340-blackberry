import {React, useState} from 'react';
import { useParams } from 'react-router-dom';
import OrganizationsButtonsGroup from '../button_groups/organizations_buttons';

// Form for modifying a record in the species table. Prepopulates the existing record.
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const OrganizationsUpdateForm = () => {

    // Get id from url
    const { id, name, type } = useParams();

    // Initialize state
    const [newName, setName] = useState(name);
    const [newType, setType] = useState(type)

    return (
        <div>
        <h1 class="text-center">Organizations</h1>
        <OrganizationsButtonsGroup />
        <div class="container">
            <p>{"Update record for organization_id " + id + " :"}</p>
        </div>

        <div class="container">
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input 
                        type="text" class="form-control" 
                        id="name" value={newName} 
                        onChange={e => setName(e.target.value)}   
                    />
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Type</label>
                    <input 
                        type="text" class="form-control" 
                        id="description" value={newType} 
                        onChange={e => setType(e.target.value)}
                    />
                </div>
                <button type="submit" class="btn btn-warning">Modify record</button>
            </form>
            </div>
    </div>
    )
    
}

export default OrganizationsUpdateForm
