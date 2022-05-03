import {React, useState} from 'react';
import { useParams } from 'react-router-dom';
import SightingsButtonsGroup from '../button_groups/sightings_buttons';

// Form for modifying a record in the species table. Prepopulates the existing record.
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const SightingsUpdateForm = () => {

    // Get id from url
    const { id, datetime, latitude, longitude, researcher_id} = useParams();

    // Initialize state
    const [newDatetime, setDatetime] = useState(datetime);
    const [newLatitude, setLatitude] = useState(latitude)
    const [newLongitude, setLongitude] = useState(longitude)
    const [newResearcher, setResearcher] = useState(researcher_id)

    return (
        <div>
        <h1 class="text-center">Sightings</h1>
        <SightingsButtonsGroup />
        <div class="container">
            <p>{"Update record for sighting_id " + id + " :"}</p>
        </div>

        <div class="container">
            <form>
                <div class="mb-3">
                    <label for="datetime" class="form-label">Date and Time</label>
                    <input 
                        type="text" class="form-control" 
                        id="datetime" value={newDatetime} 
                        onChange={e => setDatetime(e.target.value)}   
                    />
                </div>
                <div class="mb-3">
                    <label for="latitude" class="form-label">Latitude</label>
                    <input 
                        type="number" class="form-control" 
                        id="latitude" value={newLatitude} 
                        onChange={e => setLatitude(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="longitude" class="form-label">Longitude</label>
                    <input 
                        type="number" class="form-control" 
                        id="longitude" value={newLongitude} 
                        onChange={e => setLongitude(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="researcher_id" class="form-label">Researcher ID</label>
                    <input 
                        type="number" class="form-control" 
                        id="researcher_id" value={newResearcher} 
                        onChange={e => setResearcher(e.target.value)}
                    />
                </div>
                <button type="submit" class="btn btn-warning">Modify record</button>
            </form>
            </div>
    </div>
    )
    
}

export default SightingsUpdateForm
