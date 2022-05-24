import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WhalesButtonGroup from './button_groups/whales_buttons';
const axios = require('axios').default;

// Whales table page
export default class Whales extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data: [],
      toasted: false,
    };
  }

  componentDidMount() {
    this.updateData();
  }

  async updateData() {
    const res = await axios.get('/api/whales');
    this.setState({data: res.data});
    this.showToast()
  };

  showToast(){
    if (this.props.toast === "Success" && !this.state.toasted){
      this.setState({toasted: true})
      const msg = toast.loading("Updating record...");
      toast.update(msg, { render: "Success!", type: "success", isLoading: false, autoClose: 2000, closeOnClick: true, delay: 500})
    }
  }
  
    
  render() {
    return (
      <div class="container">
        <h1 class="text-center">Whales</h1>
        <WhalesButtonGroup />
        <ToastContainer />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">whale_id</th>
              <th scope="col">name</th>
              <th scope="col">birthyear</th>
              <th scope="col">is_female</th>
              <th scope="col">is_transient</th>
              <th scope="col">species_id</th>
              <th scope="col">species</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map(row => 
                <tr key={row.whale_id}>
                  <th scope="row">{row.whale_id}</th>
                  <td>{row.name}</td>
                  <td>{row.birthyear}</td>
                  <td>{row.is_female === 1 ? "Yes": "No"}</td>
                  <td>{row.is_transient === 1 ? "Yes": "No"}</td>
                  <td>{row.species_id}</td>
                  <td>{row.species_name}</td>
                  <td>
                    <a 
                      href={"/whales/update/" + row.whale_id + "/" + row.name + "/" + row.birthyear + "/" + row.is_female + "/" + row.is_transient + "/" + row.species_id} 
                      class="btn btn-light btn-md"
                    >Edit</a>
                  </td>
                  <td>
                    <a 
                      href={"/whales/delete/" + row.whale_id + "/" + row.name + "/" + row.birthyear + "/" + row.is_female + "/" + row.is_transient + "/" + row.species_id}
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
