import React from 'react';
import SpeciesButtonGroup from './button_groups/species_buttons';
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
        <div class="container">
          <h1 class="text-center">Species</h1>
          <SpeciesButtonGroup />
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
                    <td>
                      <a 
                        href={"/species/update/" + row.species_id + "/" + row.name + "/" + row.description} 
                        class="btn btn-light btn-md"
                      >Modify</a>
                    </td>
                    <td>
                      <a 
                        href={"/species/delete/" + row.species_id + "/" + row.name + "/" + row.description}
                        class="btn btn-danger btn-md">Delete</a></td>
                  </tr>
                )
              }
            </tbody>
          </table>

          {this.state.data[0] ? "" : 
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          }
        </div>
      ) 
    }
  }
