import React from 'react';
import ResearchersButtonsGroup from './button_groups/researchers_buttons';
const axios = require('axios').default;

// Researchers table page
export default class Reserachers extends React.Component {

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
    const res = await axios.get('/api/researchers');
    this.setState({data: res.data})
  };
    
  render() {
    return (
      <div class="container">
        <h1 class="text-center">Researchers</h1>
        <ResearchersButtonsGroup />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">researcher_id</th>
              <th scope="col">first_name</th>
              <th scope="col">last_name</th>
              <th scope="col">email</th>
              <th scope="col">organization_id</th>
              <th scope="col">organization</th>
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
                    >Modify</a>
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
