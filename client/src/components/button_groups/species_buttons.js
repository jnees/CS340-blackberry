import React from 'react';

export default class SpeciesButtonGroup extends React.Component {
    
    render() {
      return (
        <div>
            <ul class="nav justify-content-center">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/species">Refresh</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/species/insert">Insert</a>
              </li>
            </ul>
        </div>
      ) 
    }
  }





