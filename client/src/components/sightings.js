import React from 'react';
import SightingsButtonGroup from './button_groups/sightings_buttons';
const axios = require('axios').default;

/* 
  Sightings table page. Displays sightings data along with the whale_id's from each sighting
  which are taken from the Sightings_Whales table
*/
export default class Sightings extends React.Component {

  constructor(props){
    super(props);

    // data is pulled on refresh from API. 
    // Filtered data is calculated when the user updates the input.
    this.state = {
      data: [],
      sightingIdFilter: null,
      filteredData: []
    };
  }

  componentDidMount() {
    this.updateData();
  }

  // API data refresh
  async updateData() {
    const res = await axios.get('/api/sightings');
    this.setState(
      {
        data: res.data, 
        filteredData: res.data
      })
  };

  // Adjusts state of filteredData based on user input
  updateIdFilter(val){
    // Empty filter -> set to show all data.
    if (!val) {
      this.setState(
        {filteredData: this.state.data}
      )
      return;
    }
    
    // User applied filter -> filter records by sighting_id
    this.setState(
      {
        filteredData: this.state.data.filter(row => row.sighting_id.toString() === val)
      }
    )
  }
    
  render() {
    return (
      <div class="container">
        <h1 class="text-center">Sightings</h1>
        <SightingsButtonGroup />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">sighting_id</th>
              <th scope="col">datetime</th>
              <th scope="col">latitude</th>
              <th scope="col">longitude</th>
              <th scope="col">researcher_id</th>
              <th scope="col">whale_ids</th>
            </tr>
            <tr>
              <input placeholder="filter" onChange={e => this.updateIdFilter(e.target.value)} />
            </tr>
          </thead>
          <tbody>
            {
              this.state.filteredData.map(row => 
                <tr>
                  <th scope="row">{row.sighting_id}</th>
                  <td>{row.datetime}</td>
                  <td>{row.latitude}</td>
                  <td>{row.longitude}</td>
                  <td>{row.researcher_id}</td>
                  <td>{row.whale_ids}</td>
                  <td>
                    <a 
                      href={"/sightings/update/" + row.sighting_id + "/" + row.datetime + "/" + row.latitude + "/" + row.longitude + "/" + row.researcher_id + "/" + row.whale_ids} 
                      class="btn btn-light btn-md"
                    >Modify</a>
                  </td>
                  <td>
                    <a 
                      href={"/sightings/delete/" +  row.sighting_id + "/" + row.datetime + "/" + row.latitude + "/" + row.longitude + "/" + row.researcher_id+ "/" + row.whale_ids}
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
