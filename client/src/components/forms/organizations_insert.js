import { React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrganizationsButtonsGroup from '../button_groups/organizations_buttons';
const axios = require('axios').default;

// Form for inserting records into the species table.
const OrganizationsInsertForm = () => {
    
    let navigate = useNavigate();

    // Initialize state
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    const clearState = () => {
        setName("");
        setType("");
    }


    const handleSubmit = async (event) => {
      event.preventDefault();
      const msg = toast.loading("Adding record...");

      // Validate name
      if(name === ""){
        toast.update(msg, { render: "Organization must have a name!", type: "error", isLoading: false, autoClose: 3000});
        return
      }

      // Validate type
      if (type === ""){
        toast.update(msg, { render: "Organization must have a type!", type: "error", isLoading: false, autoClose: 3000});
        return
      }

      axios({
          method: "post",
          url: "/api/organizations",
          data: {name, type}
      })
          .then((res) => {
            if (res.status !== 200){
              toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
            } else {
              navigate("/organizations/success");
            }
          })
          .catch((err) => {
              toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000})
          })
    }

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
                  <select onChange={e => setType(e.target.value)} class="form-control" id="type">
                        <option></option>
                        <option>Educational</option>
                        <option>Tourism</option>
                        <option>Non-Profit</option>
                        <option>Other</option>
                    </select>
              </div>
              <button onClick={(e) => {handleSubmit(e)}} 
                type="submit" class="btn btn-primary">Add record</button>
          </form>
          </div>
      </div>
    ) 
    
  }


  export default OrganizationsInsertForm