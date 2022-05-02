import React from 'react';
import WhalesButtonGroup from './button_groups/whales_buttons';
const axios = require('axios').default;

// Whales table page
export default class Whales extends React.Component {

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
    const res = await axios.get('/api/whales');
    this.setState({data: res.data})
  };
    
  render() {
    return (
      <div class="container">
        <h1 class="text-center">Whales</h1>
        <WhalesButtonGroup />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">whale_id</th>
              <th scope="col">name</th>
              <th scope="col">birthyear</th>
              <th scope="col">is_female</th>
              <th scope="col">is_transient</th>
              <th scope="col">species_id</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map(row => 
                <tr>
                  <th scope="row">{row.whale_id}</th>
                  <td>{row.name}</td>
                  <td>{row.birthyear}</td>
                  <td>{row.is_female}</td>
                  <td>{row.is_transient}</td>
                  <td>{row.species_id}</td>
                  <td>
                    <a 
                      href={"/whales/update/" + row.whale_id + "/" + row.name + "/" + row.birthyear + "/" + row.is_female + "/" + row.is_transient + "/" + row.species_id} 
                      class="btn btn-light btn-md"
                    >Modify</a>
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
