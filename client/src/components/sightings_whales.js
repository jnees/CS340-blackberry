import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SightingsWhalesButtonsGroupMain from './button_groups/sightings_whales_buttons_main';
const axios = require('axios').default;

function distinct(value, index, self) {
  return self.indexOf(value) === index
}


// Species Table page
export default class SightingsWhales extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        data: [],
        whaleFilter: null,
        filteredData: [],
        uniqueWhaleNames: []
      };
    }

    componentDidMount() {
      this.updateData();
      // this.dedupeWhales();
    }

    async updateData() {
      console.log("Update data called")
      const res = await axios.get('/api/sightings_whales');
      this.setState(
        {
          data: res.data, 
          filteredData: res.data,
          uniqueWhaleNames: this.dedupeWhales(res.data)
        })
      this.showToast();
    };

    // Adjusts state of filteredData based on user input
    updateWhaleFilter(val){
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
          filteredData: this.state.data.filter(row => row.whale_name === val)
        }
      )
    }

    dedupeWhales(data){
      var whales = [];
      data.forEach(row => whales.push(row.whale_name));
      var uniqueWhales = whales.filter(distinct);
      return uniqueWhales.sort();
    }

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
          <SightingsWhalesButtonsGroupMain />
          <ToastContainer />
          <div>
            <label for="whale-select" class="form-label">Filter on Whale Name</label>
            <select id="whale-select" class="form-select" onChange={e => this.updateWhaleFilter(e.target.value)}>
              <option value="">All Whales</option>
              { this.state.uniqueWhaleNames.map(row =>
                <option id={row}>{row}</option> 
                )}
            </select>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Sighting Whale ID</th>
                <th scope="col">Sighting ID</th>
                <th scope="col">Whale Name</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.filteredData.map(row => 
                  <tr>
                    <th scope="row">{row.sighting_whale_id}</th>
                    <td>{row.sighting_id}</td>
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