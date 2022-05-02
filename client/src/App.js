import {
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import AppNavbar from './components/navbar';
import Home from "./components/home";
import Whales from "./components/whales"
import Species from "./components/species"
import Researchers from "./components/researchers"
import Organizations from "./components/organizations"
import Sightings from "./components/sightings"
import SightingsWhales from "./components/sightings_whales"
import SpeciesInsertForm from "./components/forms/species_insert";
import SpeciesUpdateForm from "./components/forms/species_update";
import SpeciesDeleteForm from "./components/forms/species_delete";

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
          <Route path="/sightings_whales" element={<SightingsWhales />} />

          <Route path="/species/insert" element={<SpeciesInsertForm />} />
          <Route path="/species/update/:id/:name/:description" element={<SpeciesUpdateForm />} />
          <Route path="/species/delete/:id/:name/:description" element={<SpeciesDeleteForm />} />
        </Routes>
    </div>

  );
}

export default App;
