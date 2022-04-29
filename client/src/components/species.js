import React from 'react';
const axios = require('axios').default;

export default class Species extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        data: [],
      };
    }

    componentDidMount() {
      this.updateData();
    }

    async updateData() {
      const res = await axios.get('/api/species');
      this.setState({data: res.data})
    };
    
    render() {
      return (
        <div>
          <h1>Species</h1>
          <p>{this.state.data[0] ? "" : "Data loading"}</p>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">species_id</th>
                <th scope="col">name</th>
                <th scope="col">description</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map(row => 
                  <tr>
                    <th scope="row">{row.species_id}</th>
                    <td>{row.name}</td>
                    <td>{row.description}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      ) 
    }
  }
