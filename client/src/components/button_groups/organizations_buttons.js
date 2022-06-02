import React from 'react';

// Button group for refresh/insert into species table.
export default class OrganizationsButtonGroup extends React.Component {
    
    render() {
      return (
        <div>
            <ul class="nav justify-content-center">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/organizations">Cancel</a>
              </li>
            </ul>
        </div>
      ) 
    }
  }