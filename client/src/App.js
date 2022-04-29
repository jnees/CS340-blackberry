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
import SpeciesInsertForm from "./components/forms/species_insert";
import SpeciesUpdateForm from "./components/forms/species_update";

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
          <Route path="/species/update" element={<SpeciesUpdateForm />} />
        </Routes>
    </div>

  );
}

export default App;
