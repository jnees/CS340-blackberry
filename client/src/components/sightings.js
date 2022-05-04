import React from 'react';
import SightingsButtonGroup from './button_groups/sightings_buttons';
const axios = require('axios').default;

// Sightings table page
export default class Sightings extends React.Component {

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
    const res = await axios.get('/api/sightings');
    this.setState({data: res.data})
  };
    
  render() {
    return (
      <div class="container">
        <h1 class="text-center">Sightings</h1>
        <SightingsButtonGroup />
        <div class="select">
          <select class="form-control" id="whale_id">
            <option selected>Filter on whale_id</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
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
          </thead>
          <tbody>
            {
              this.state.data.map(row => 
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
