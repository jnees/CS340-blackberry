import {
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import AppNavbar from './components/navbar';
import Home from "./components/home";
import Whales from "./components/whales";
import Species from "./components/species";
import Researchers from "./components/researchers";
import Organizations from "./components/organizations";
import Sightings from "./components/sightings";
import SpeciesInsertForm from "./components/forms/species_insert";
import SpeciesUpdateForm from "./components/forms/species_update";
import WhalesUpdateForm from "./components/forms/whales_update";
import ResearchersUpdateForm from "./components/forms/researchers_update";
import OrganizationsUpdateForm from "./components/forms/organizations_update";
import SightingsUpdateForm from "./components/forms/sightings_update";
import WhalesInsertForm from "./components/forms/whales_insert";
import ResearchersInsertForm from "./components/forms/researchers_insert";
import OrganizationsInsertForm from "./components/forms/organizations_insert";
import SightingsInsertForm from "./components/forms/sightings_insert";
import SpeciesDeleteForm from "./components/forms/species_delete";
import WhalesDeleteForm from "./components/forms/whales_delete";
import ResearchersDeleteForm from "./components/forms/researchers_delete"
import OrganizationsDeleteForm from "./components/forms/organizations_delete"
import SightingsDeleteForm from "./components/forms/sightings_delete"

/* The App() function always displays the navbar. It also acts as the router for the
entire app by showing whichever component the user navigates to below the nav bar.
Add new routes here as needed. */
function App() {
  return (
    <div>
      <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/whales" element={<Whales />} />
          <Route path="/species" element={<Species />} />
          <Route path="/researchers" element={<Researchers />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/sightings" element={<Sightings />} />
          
          <Route path="/species/insert" element={<SpeciesInsertForm />} />
          <Route path="/whales/insert" element={<WhalesInsertForm />} />
          <Route path="/researchers/insert" element={<ResearchersInsertForm />} />
          <Route path="/organizations/insert" element={<OrganizationsInsertForm />} />
          <Route path="/sightings/insert" element={<SightingsInsertForm />} />

          <Route path="/species/update/:id/:name/:description" element={<SpeciesUpdateForm />} />
          <Route path="/whales/update/:id/:name/:birthyear/:is_female/:is_transient/:species_id" element={<WhalesUpdateForm />} />
          <Route path="/researchers/update/:id/:first_name/:last_name/:email/:organization_id" element={<ResearchersUpdateForm />} />
          <Route path="/organizations/update/:id/:name/:type" element={<OrganizationsUpdateForm />} />
          <Route path="/sightings/update/:id/:datetime/:latitude/:longitude/:researcher_id/:whale_ids" element={<SightingsUpdateForm />} />

          <Route path="/species/delete/:id/:name/:description" element={<SpeciesDeleteForm />} />
          <Route path="/whales/delete/:id/:name/:birthyear/:is_female/:is_transient/:species_id" element={<WhalesDeleteForm />} />
          <Route path="/researchers/delete/:id/:first_name/:last_name/:email/:organization_id" element={<ResearchersDeleteForm />} />
          <Route path="/organizations/delete/:id/:name/:type" element={<OrganizationsDeleteForm />} />
          <Route path="/sightings/delete/:id/:datetime/:latitude/:longitude/:researcher_id/:whale_ids" element={<SightingsDeleteForm />} />



        </Routes>
    </div>

  );
}

export default App;
