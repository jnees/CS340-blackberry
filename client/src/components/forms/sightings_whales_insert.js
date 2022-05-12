import React from 'react';
import SightingsWhalesButtonsGroup from '../button_groups/sightings_whales_buttons';

// Form for inserting records into the species table.
export default class SightingsWhalesInsertForm extends React.Component {
    
    render() {
      return (
        <div>
            <h1 class="text-center">Sightings_Whales</h1>
            <SightingsWhalesButtonsGroup />
            <div class="container">
            <form>
                <div class="mb-3">
                    <label for="sighting_id" class="form-label">Sighting ID</label>
                    <input type="number" class="form-control" id="sighting_id" />
                </div>
                <div class="mb-3">
                    <label for="whale_id" class="form-label">Whale ID</label>
                    <input type="number" class="form-control" id="whale_id" />
                </div>
                <button type="submit" class="btn btn-primary">Add record</button>
            </form>
            </div>
        </div>
      ) 
    }
  }