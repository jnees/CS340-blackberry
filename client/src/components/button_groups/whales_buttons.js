import React from 'react';

// Button group for refresh/insert into species table.
export default class WhalesButtonGroup extends React.Component {
    
    render() {
      return (
        <div>
            <ul class="nav justify-content-center">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/whales">Refresh</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/whales/insert">Add New</a>
              </li>
            </ul>
        </div>
      ) 
    }
  }