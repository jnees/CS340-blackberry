import React from 'react';
import SightingsWhalesButtonsGroup from './button_groups/sightings_whales_buttons';
const axios = require('axios').default;

// Species Table page
export default class SightingsWhales extends React.Component {

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
      const res = await axios.get('/api/sightings_whales');
      this.setState({data: res.data})
    };
    
    render() {
      return (
        <div class="container">
          <h1 class="text-center">Sightings_Whales</h1>
          <SightingsWhalesButtonsGroup />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">sighting_whale_id</th>
                <th scope="col">sighting_id</th>
                <th scope="col">whale_id</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map(row => 
                  <tr>
                    <th scope="row">{row.sighting_whale_id}</th>
                    <td>{row.sighting_id}</td>
                    <td>{row.whale_id}</td>
                    <td>
                      <a 
                        href={"/sightings_whales/update/" + row.sighting_whale_id + "/" + row.sighting_id + "/" + row.whale_id} 
                        class="btn btn-light btn-md"
                      >Modify</a>
                    </td>
                    <td>
                      <a 
                        href={"/sightings_whales/delete/" + row.sighting_whale + "/" + row.sighting_id + "/" + row.whale_id}
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