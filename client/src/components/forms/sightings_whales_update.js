import {React, useState} from 'react';
import { useParams } from 'react-router-dom';
import SightingsWhalesButtonsGroup from '../button_groups/sightings_whales_buttons';

// Form for modifying a record in the species table. Prepopulates the existing record.
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const SightingsWhalesUpdateForm = () => {

    // Get id from url
    const { id, sighting_id, whale_id } = useParams();

    // Initialize state
    const [newSighting, setSighting] = useState(sighting_id);
    const [newWhale, setWhale] = useState(whale_id)

    return (
        <div>
        <h1 class="text-center">Sightings_Whales</h1>
        <SightingsWhalesButtonsGroup />
        <div class="container">
            <p>{"Update record for sighting_whale " + id + " :"}</p>
        </div>

        <div class="container">
            <form>
                <div class="mb-3">
                    <label for="sighting_id" class="form-label">Sighting ID</label>
                    <input 
                        type="number" class="form-control" 
                        id="sighting_id" value={newSighting} 
                        onChange={e => setSighting(e.target.value)}   
                    />
                </div>
                <div class="mb-3">
                    <label for="whale_id" class="form-label">Whale ID</label>
                    <input 
                        type="number" class="form-control" 
                        id="whale_id" value={newWhale} 
                        onChange={e => setWhale(e.target.value)}
                    />
                </div>
                <button type="submit" class="btn btn-warning">Modify record</button>
            </form>
            </div>
    </div>
    )
    
}

export default SightingsWhalesUpdateForm