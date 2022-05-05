import React from 'react';

// Home page for the project. Might be good to add the ER Diagram to this?
export default class Home extends React.Component {
    
    render() {
      return (
       <div class="container text-center">
         <h1>ER Diagram</h1>
         <img src="/er_diagram.png" class="img-fluid" alt="ER Diagram" />
       </div>
      ) 
    }
  }
