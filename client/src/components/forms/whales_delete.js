import { React } from 'react';
import { useParams } from 'react-router-dom';
import WhalesButtonsGroup from '../button_groups/whales_buttons';

// Delete confirmation page for species
// Uses a function instead of class to make getting
// the query parameters easier (useParams hook)
const WhalesDeleteForm = () => {

    // Get id from url
    const { id, name, birthyear, is_female, is_transient, species_id } = useParams();

    return (
        <div class="container">
            <h1 class="text-center">Delete Whale</h1>
            <WhalesButtonsGroup />
            <div class="container text-left">
                <div class="row">
                    <div class="col">
                        <h2>{"Delete this record?"}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">whale_id</p>
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
                        <p class="bold">birthyear</p>
                    </div>
                    <div class="col-sm">
                        <p>{birthyear}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">is_female</p>
                    </div>
                    <div class="col-sm">
                        <p>{is_female}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">is_transient</p>
                    </div>
                    <div class="col-sm">
                        <p>{is_transient}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <p class="bold">species_id</p>
                    </div>
                    <div class="col-sm">
                        <p>{species_id}</p>
                    </div>
                </div>
                <button type="submit" class="btn btn-danger">Delete record</button>
            </div>

        </div>    
    )
    
}

export default WhalesDeleteForm
