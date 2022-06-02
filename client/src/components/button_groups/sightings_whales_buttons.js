import React from 'react';

// Button group for refresh/insert into species table.
export default class SightingsWhalesButtonGroup extends React.Component {
    
    render() {
      return (
        <div>
            <ul class="nav justify-content-center">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/sightings_whales">Cancel</a>
              </li>
            </ul>
        </div>
      ) 
    }
  }