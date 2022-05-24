import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SightingsButtonsGroup from './button_groups/sightings_buttons';
const axios = require('axios').default;

// Sightings table page
export default class Sightings extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data: [],
      toasted: false
    };
  }

  componentDidMount() {
    this.updateData();
  }

  async updateData() {
    const res = await axios.get('/api/sightings');
    this.setState({data: res.data});
    this.showToast();
  };

  showToast(){
    if (this.props.toast === "Success" && !this.state.toasted){
      this.setState({toasted: true});
      const msg = toast.loading("Updating record...");
      toast.update(msg, { render: "Success!", type: "success", isLoading: false, autoClose: 2000, closeOnClick: true, delay: 500})
    }
  }
    
  render() {
    return (
      <div class="container">
        <h1 class="text-center">Sightings</h1>
        <SightingsButtonsGroup />
        <ToastContainer />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Sighting ID</th>
              <th scope="col">Date and Time</th>
              <th scope="col">Latitude</th>
              <th scope="col">Longitude</th>
              <th scope="col">Whale Name</th>
              <th scope="col">Researcher Name</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map(row => 
                <tr key={row.sighting_id}>
                  <th scope="row">{row.sighting_id}</th>
                  <td>{row.datetime}</td>
                  <td>{row.latitude}</td>
                  <td>{row.longitude}</td>
                  <td>{row.whale_name}</td>
                  <td>{row.researcher_name}</td>
                  <td>
                    <a 
                      href={"/sightings/update/" + row.sighting_id + "/" + row.datetime + "/" + row.latitude + "/" + row.longitude + "/" + row.whale_name + "/" + row.researcher_name} 
                      class="btn btn-light btn-md"
                    >Edit</a>
                  </td>
                  <td>
                    <a 
                      href={"/sightings/delete/" + row.sighting_id + "/" + row.datetime + "/" + row.latitude + "/" + row.longitude + "/" + row.whale_name + "/" + row.researcher_name}
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
