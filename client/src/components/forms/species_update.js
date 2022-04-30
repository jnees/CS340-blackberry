import {React, useState} from 'react';
import { useParams } from 'react-router-dom';
import SpeciesButtonGroup from '../button_groups/species_buttons';

// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const SpeciesUpdateForm = () => {

    // Get id from url
    const { id, name, description } = useParams();

    // Initialize state
    const [newName, setName] = useState(name);
    const [newDescription, setDescription] = useState(description)

    return (
        <div>
        <h1 class="text-center">Species</h1>
        <SpeciesButtonGroup />
        <div class="container">
            <p>{"Update record for species_id " + id + " :"}</p>
        </div>

        <div class="container">
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Species name</label>
                    <input 
                        type="text" class="form-control" 
                        id="name" value={newName} 
                        onChange={e => setName(e.target.value)}   
                    />
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Species Description</label>
                    <input 
                        type="text" class="form-control" 
                        id="description" value={newDescription} 
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit" class="btn btn-warning">Modify record</button>
            </form>
            </div>
    </div>
    )
    
}

export default SpeciesUpdateForm
