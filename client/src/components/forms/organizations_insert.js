import React from 'react';
import OrganizationsButtonsGroup from '../button_groups/organizations_buttons';

// Form for inserting records into the species table.
export default class OrganizationsInsertForm extends React.Component {
    
    render() {
      return (
        <div>
            <h1 class="text-center">Organization</h1>
            <OrganizationsButtonsGroup />
            <div class="container">
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" />
                </div>
                <div class="mb-3">
                    <label for="type" class="form-label">Type</label>
                    <input type="text" class="form-control" id="type" />
                </div>
                <button type="submit" class="btn btn-primary">Add record</button>
            </form>
            </div>
        </div>
      ) 
    }
  }
