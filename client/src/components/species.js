import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpeciesButtonsGroupMain from './button_groups/species_buttons_main';
const axios = require('axios').default;

// Species table page
export default class Species extends React.Component {

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
    const res = await axios.get('/api/species');
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
        <h1 class="text-center">Species</h1>
        <SpeciesButtonsGroupMain />
        <ToastContainer />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Species ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map(row => 
                <tr key={row.species_id}>
                  <th scope="row">{row.species_id}</th>
                  <td>{row.name}</td>
                  <td>{row.description}</td>
                  <td>
                    <a 
                      href={"/species/update/" + row.species_id + "/" + row.name + "/" + row.description} 
                      class="btn btn-light btn-md"
                    >Edit</a>
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
