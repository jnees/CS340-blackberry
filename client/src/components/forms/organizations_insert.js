import { React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrganizationsButtonsGroup from '../button_groups/organizations_buttons';
const axios = require('axios').default;

// Form for inserting records into the species table.
const OrganizationsInsertForm = () => {
    
    let navigate = useNavigate();

    const clearState = () => {
        setName("");
        setType("");
    }

    const dataValidation = () => {
      // TODO: DATA VALIDATION
    }

    const handleSubmit = async (event) => {
      const msg = toast.loading("Adding record...");
      dataValidation();
      event.preventDefault();
      axios({
          method: "post",
          url: "/api/organizations",
          data: {name, type}
      })
          .then((res) => {
              clearState();
              navigate("/organizations/success");
          })
          .catch((err) => {
              toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000})
          })
    }

    // Initialize state
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    return (
      <div>
          <h1 class="text-center">Add New Organization</h1>
          <OrganizationsButtonsGroup />
          <ToastContainer />
          <div class="container">
          <form>
              <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" class="form-control" id="name" 
                    value={name} onChange={e => setName(e.target.value)}
                  />
              </div>
              <div class="mb-3">
                  <label for="type" class="form-label">Type</label>
                  <input type="text" class="form-control" id="type" 
                    value={type} onChange={e => setType(e.target.value)}
                  />
              </div>
              <button onClick={(e) => {handleSubmit(e)}} 
                type="submit" class="btn btn-primary">Add record</button>
          </form>
          </div>
      </div>
    ) 
    
  }


  export default OrganizationsInsertForm