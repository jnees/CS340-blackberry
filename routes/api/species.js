// This router handles all API requests involving CRUD operations to the species table

const express = require("express");
const router = express.Router();

// TODO: DB integration.

// @route GET api/species
// @desc Get all records from the species table
router.get("/", (req, res) => {
    dummy_data = [
        {
            "species_id" : 1,
            "name" : "Orca",
            "description" : "Black-and-white patterned body."
        },
        {
            "species_id" : 2,
            "name" : "Gray",
            "description" : "Gray patches and white mottling on dark skin."
        },
        {
            "species_id" : 3,
            "name" : "Humpback",
            "description" : "Long pectoral fins and a knobbly head."
        },
        {
            "species_id" : 4,
            "name" : "Minke",
            "description" : "Black to dark gray with a pale chevron on the back behind the head and above the flippers."
        },
        {
            "species_id" : 5,
            "name" : "Pacific White Sided Dolphin",
            "description" : "Dark gray flippers and dorsal fin. Light gray patches on the sides."
        }
    ]

    res.json(dummy_data);
});


// @route POST api/species
// @desc Insert records into species
router.post("/", (req, res) => {
   res.send("This route should handle adding data into the species table.")
});

// @route PUT api/species
// @desc Update records in species
router.put("/", (req, res) => {
    res.send("This route should handle updating data in the species table.")
 });


// @route DELETE api/species
// @desc Delete records from species
router.delete("/", (req, res) => {
    res.send("This route should handle updating data in the species table.")
 });

 module.exports = router;