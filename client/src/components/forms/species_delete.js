import { React } from 'react';
import { useParams } from 'react-router-dom';
import SpeciesButtonGroup from '../button_groups/species_buttons';

// Delete confirmation page for species
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const SpeciesDeleteForm = () => {

    // Get id from url
    const { id, name, description } = useParams();

    return (
        <div class="container">
            <h1 class="text-center">Species</h1>
            <SpeciesButtonGroup />
            <div class="container text-left">
                <div class="row">
                    <div class="col">
                        <h2>{"Delete this record?"}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">species_id</p>
                    </div>
                    <div class="col-sm">
                        <p>{id}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">name</p>
                    </div>
                    <div class="col-sm">
                        <p>{name}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">description</p>
                    </div>
                    <div class="col-sm">
                        <p>{description}</p>
                    </div>
                </div>
            
            
                <button type="submit" class="btn btn-danger">Delete record</button>
            </div>

        </div>    
    )
    
}

export default SpeciesDeleteForm
