import { React, useEffect, useState} from 'react';
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
    const [org_list, setOrgList] = useState([]);

    useEffect(() => {
      getOrgData();
    }, [])

    const clearState = () => {
        setName("");
        setType("");
    }

    const getOrgData = async () => {
      axios({
          method: "get", url: "/api/organizations",
      })
          .then((res) => {
              setOrgList(res.data);
          })
          .catch((err) => {
              toast.error('Error getting org names', {});
          })
  }

    const handleSubmit = async (event) => {
      const msg = toast.loading("Adding record...");
      event.preventDefault();

      // Validate whale selected
      if (name === "") {
        return toast.update(msg, { render: "Must select an organization!", type: "error", isLoading: false, autoClose: 3000});
      }

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



    return (
      <div>
          <h1 class="text-center">Add New Organization</h1>
          <OrganizationsButtonsGroup />
          <ToastContainer />
          <div class="container">
          <form>
              <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <select onChange={e => setName(e.target.value)} class="form-control" id="name">
                        <option></option>
                        {org_list.map(org =>
                            <option 
                                key={org.name} 
                                value={org.name}
                            >{org.name}</option>
                        )}
                    </select>
              </div>
              <div class="mb-3">
                  <label for="type" class="form-label">Type</label>
                  <select onChange={e => setType(e.target.value)} class="form-control" id="type">
                        <option></option>
                        <option>Educational</option>
                        <option>Tourism</option>
                        <option>Non-profit</option>
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