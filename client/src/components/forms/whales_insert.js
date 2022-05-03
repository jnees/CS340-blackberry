import React from 'react';
import WhalesButtonsGroup from '../button_groups/whales_buttons';

// Form for inserting records into the species table.
export default class WhalesInsertForm extends React.Component {
    
    render() {
      return (
        <div>
            <h1 class="text-center">Whales</h1>
            <WhalesButtonsGroup />
            <div class="container">
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" />
                </div>
                <div class="mb-3">
                    <label for="birthyear" class="form-label">Birthyear</label>
                    <input type="number" class="form-control" id="birthyear" />
                </div>
                <div class="mb-3">
                    <label for="is_female" class="form-label">Is Female</label>
                    <input type="number" class="form-control" id="is_female" />
                </div>
                <div class="mb-3">
                    <label for="is_transient" class="form-label">Is Transient</label>
                    <input type="number" class="form-control" id="is_transient" />
                </div>
                <div class="mb-3">
                    <label for="species_id" class="form-label">Species ID</label>
                    <input type="number" class="form-control" id="species_id" />
                </div>
                <button type="submit" class="btn btn-primary">Add record</button>
            </form>
            </div>
        </div>
      ) 
    }
  }
