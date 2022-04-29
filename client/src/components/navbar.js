import React from 'react';

export default class AppNavbar extends React.Component {
    
    render() {
      return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Home</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Whales</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Species</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Researchers</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Organizations</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Sightings</a>
                        </li>
                        <li class="nav-item">
                             <a class="nav-link" href="#">{this.props.value}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
      ) 
    }
  }
