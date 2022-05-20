import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrganizationsButtonGroup from './button_groups/organizations_buttons';
const axios = require('axios').default;

// Organizations table page
export default class Organizations extends React.Component {

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
    const res = await axios.get('/api/organizations');
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
        <h1 class="text-center">Organizations</h1>
        <OrganizationsButtonGroup />
        <ToastContainer />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">organization_id</th>
              <th scope="col">name</th>
              <th scope="col">type</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map(row => 
                <tr>
                  <th scope="row">{row.organization_id}</th>
                  <td>{row.name}</td>
                  <td>{row.type}</td>
                  <td>
                    <a 
                      href={"/organizations/update/" + row.organization_id + "/" + row.name + "/" + row.type} 
                      class="btn btn-light btn-md"
                    >Modify</a>
                  </td>
                  <td>
                    <a 
                      href={"/organizations/delete/" + row.organization_id + "/" + row.name + "/" + row.type}
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
