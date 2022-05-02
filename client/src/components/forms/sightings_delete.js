import { React } from 'react';
import { useParams } from 'react-router-dom';
import SightingsButtonsGroup from '../button_groups/sightings_buttons';

// Delete confirmation page for species
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const SightingsDeleteForm = () => {

    // Get id from url
    const { id, datetime, latitude, longitude, researcher_id } = useParams();

    return (
        <div class="container">
            <h1 class="text-center">Whale</h1>
            <SightingsButtonsGroup />
            <div class="container text-left">
                <div class="row">
                    <div class="col">
                        <h2>{"Delete this record?"}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">sighting_id</p>
                    </div>
                    <div class="col-sm">
                        <p>{id}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">datetime</p>
                    </div>
                    <div class="col-sm">
                        <p>{datetime}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">latitude</p>
                    </div>
                    <div class="col-sm">
                        <p>{latitude}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">longitude</p>
                    </div>
                    <div class="col-sm">
                        <p>{longitude}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">researcher_id</p>
                    </div>
                    <div class="col-sm">
                        <p>{researcher_id}</p>
                    </div>
                </div>
                <button type="submit" class="btn btn-danger">Delete record</button>
            </div>

        </div>    
    )
    
}

export default SightingsDeleteForm
