import { React } from 'react';
import { useParams } from 'react-router-dom';
import SightingsWhalesButtonGroup from '../button_groups/sightings_whales_buttons';

// Delete confirmation page for species
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const SightingsWhalesDeleteForm = () => {

    // Get id from url
    const { id, sighting_id, whale_id } = useParams();

    return (
        <div class="container">
            <h1 class="text-center">Sighting/Whale</h1>
            <SightingsWhalesButtonGroup />
            <div class="container text-left">
                <div class="row">
                    <div class="col">
                        <h2>{"Delete this record?"}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">sighting_whale_id</p>
                    </div>
                    <div class="col-sm">
                        <p>{id}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">sighting_id</p>
                    </div>
                    <div class="col-sm">
                        <p>{sighting_id}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">whale_id</p>
                    </div>
                    <div class="col-sm">
                        <p>{whale_id}</p>
                    </div>
                </div>
            
            
                <button type="submit" class="btn btn-danger">Delete record</button>
            </div>

        </div>    
    )
    
}

export default SightingsWhalesDeleteForm
