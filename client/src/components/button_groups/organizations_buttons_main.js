import React from 'react';

// Button group for refresh/insert into species table.
export default class OrganizationsButtonGroupMain extends React.Component {
    
    render() {
      return (
        <div>
            <ul class="nav justify-content-center">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/organizations">Refresh</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/organizations/insert">Add New</a>
              </li>
            </ul>
        </div>
      ) 
    }
  }