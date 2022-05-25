import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
          <h1 class="text-center">Sightings_Whales</h1>
          <SightingsWhalesButtonsGroup />
          <ToastContainer />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Sighting ID</th>
                <th scope="col">Sighting Whale ID</th>
                <th scope="col">Whale Name</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map(row => 
                  <tr>
                    <th scope="row">{row.sighting_id}</th>
                    <td>{row.sighting_whale_id}</td>
                    <td>{row.whale_name}</td>
                    <td>
                      <a 
                        href={"/sightings_whales/update/" + row.sighting_whale_id + "/" + row.sighting_id + "/" + row.whale_name} 
                        class="btn btn-light btn-md"
                      >Edit</a>
                    </td>
                    <td>
                      <a 
                        href={"/sightings_whales/delete/" + row.sighting_whale_id + "/" + row.sighting_id + "/" + row.whale_name}
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