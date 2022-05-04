import React from 'react';
import SightingsButtonsGroup from '../button_groups/sightings_buttons';

// Form for inserting records into the species table.
export default class SightingsInsertForm extends React.Component {
    
    render() {
      return (
        <div>
            <h1 class="text-center">Add New Sighting</h1>
            <SightingsButtonsGroup />
            <div class="container">
            <form>
                <div class="mb-3">
                    <label for="datetime" class="form-label">Date and Time</label>
                    <input type="text" class="form-control" id="datetime" />
                </div>
                <div class="mb-3">
                    <label for="latitude" class="form-label">Latitude</label>
                    <input type="number" class="form-control" id="latitude" />
                </div>
                <div class="mb-3">
                    <label for="longitude" class="form-label">Longitude</label>
                    <input type="number" class="form-control" id="longitude" />
                </div>
                <div class="mb-3">
                    <label for="researcher_id" class="form-label">Researcher ID</label>
                    <input type="number" class="form-control" id="researcher_id" />
                </div>
                <div class="mb-3">
                    <label for="whale_ids" class="form-label">Whale IDs</label>
                    <input type="text" class="form-control" id="whale_ids" />
                </div>
                <button type="submit" class="btn btn-primary">Add record</button>
            </form>
            </div>
        </div>
      ) 
    }
  }
