import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResearchersButtonsGroupMain from './button_groups/researchers_buttons_main';
const axios = require('axios').default;

// Researchers table page
export default class Researchers extends React.Component {

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
    const res = await axios.get('/api/researchers');
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
        <h1 class="text-center">Researchers</h1>
        <ResearchersButtonsGroupMain />
        <ToastContainer />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Researcher ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Organization ID</th>
              <th scope="col">Organization Name</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map(row => 
                <tr key={row.researcher_id}>
                  <th scope="row">{row.researcher_id}</th>
                  <td>{row.first_name}</td>
                  <td>{row.last_name}</td>
                  <td>{row.email}</td>
                  <td>{row.organization_id}</td>
                  <td>{row.organization_name}</td>
                  <td>
                    <a 
                      href={"/researchers/update/" + row.researcher_id + "/" + row.first_name + "/" + row.last_name + "/" + row.email + "/" + row.organization_id} 
                      class="btn btn-light btn-md"
                    >Edit</a>
                  </td>
                  <td>
                    <a 
                      href={"/researchers/delete/" + row.researcher_id + "/" + row.first_name + "/" + row.last_name + "/" + row.email + "/" + row.organization_id}
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
