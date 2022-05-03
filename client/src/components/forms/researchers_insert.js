import React from 'react';
import ResearchersButtonsGroup from '../button_groups/researchers_buttons';

// Form for inserting records into the species table.
export default class ResearchersInsertForm extends React.Component {
    
    render() {
      return (
        <div>
            <h1 class="text-center">Researchers</h1>
            <ResearchersButtonsGroup />
            <div class="container">
            <form>
                <div class="mb-3">
                    <label for="first_name" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="first_name" />
                </div>
                <div class="mb-3">
                    <label for="last_name" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="last_name" />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" class="form-control" id="email" />
                </div>
                <div class="mb-3">
                    <label for="organization_id" class="form-label">Organization ID</label>
                    <input type="number" class="form-control" id="organization_id" />
                </div>
                <button type="submit" class="btn btn-primary">Add record</button>
            </form>
            </div>
        </div>
      ) 
    }
  }
