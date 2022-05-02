import React from 'react';
import SpeciesButtonGroup from '../button_groups/species_buttons';

// Form for inserting records into the species table.
export default class SpeciesInsertForm extends React.Component {
    
    render() {
      return (
        <div>
            <h1 class="text-center">Species</h1>
            <SpeciesButtonGroup />
            <div class="container">
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Species name</label>
                    <input type="text" class="form-control" id="name" />
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Species Description</label>
                    <input type="text" class="form-control" id="description" />
                </div>
                <button type="submit" class="btn btn-primary">Add record</button>
            </form>
            </div>
        </div>
      ) 
    }
  }
