import React from 'react';

// Button group for refresh/insert into species table.
export default class SightingsBUttonsGroup extends React.Component {
    
    render() {
      return (
        <div>
            <ul class="nav justify-content-center">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/sightings">Refresh</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/sightings/insert">Insert</a>
              </li>
            </ul>
        </div>
      ) 
    }
  }