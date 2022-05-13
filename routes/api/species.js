// This router handles all API requests involving CRUD operations to the species table
require("dotenv").config();
const express = require("express");
const router = express.Router();

// Connect to db
const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl:
    {
        rejectUnauthorized: false
    }
});
client.connect().catch((e) => console.error("connection error", e.stack));
client.on("error", (err) => console.log(err));

// @route GET api/species
// @desc Get all records from the species table
router.get("/", (req, res) => {
    // console.log("Received species get req.")
    // dummy_data = [
    //     {
    //         "species_id" : 1,
    //         "name" : "Orca",
    //         "description" : "Black-and-white patterned body."
    //     },
    //     {
    //         "species_id" : 2,
    //         "name" : "Gray",
    //         "description" : "Gray patches and white mottling on dark skin."
    //     },
    //     {
    //         "species_id" : 3,
    //         "name" : "Humpback",
    //         "description" : "Long pectoral fins and a knobbly head."
    //     },
    //     {
    //         "species_id" : 4,
    //         "name" : "Minke",
    //         "description" : "Black to dark gray with a pale chevron on the back behind the head and above the flippers."
    //     },
    //     {
    //         "species_id" : 5,
    //         "name" : "Pacific White Sided Dolphin",
    //         "description" : "Dark gray flippers and dorsal fin. Light gray patches on the sides."
    //     }
    // ]

    // res.json(dummy_data);

    let SQL = "SELECT * FROM Species;"
    return client.query(SQL).then((result) => {
        res.json(result.rows);
    })
    .catch((err) => {
        console.error(err);
    })
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