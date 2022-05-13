// This router handles all API requests involving CRUD operations to the sightings_whales table
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

// @route GET api/sightings_whales
// @desc Get all records from the sightings_whales table
router.get("/", (req, res) => {
    // dummy_data = [
    //     {
    //         "sighting_whale_id" : 1,
    //         "sighting_id" : 1,
    //         "whale_id" : 1
    //     },
    //     {
    //         "sighting_whale_id" : 2,
    //         "sighting_id" : 1,
    //         "whale_id" : 2
    //     },
    //     {
    //         "sighting_whale_id" : 3,
    //         "sighting_id" : 2,
    //         "whale_id" : 4
    //     },
    //     {
    //         "sighting_whale_id" : 4,
    //         "sighting_id" : 3,
    //         "whale_id" : 1
    //     },
    //     {
    //         "sighting_whale_id" : 5,
    //         "sighting_id" : 3,
    //         "whale_id" : 2
    //     },
    //     {
    //         "sighting_whale_id" : 6,
    //         "sighting_id" : 3,
    //         "whale_id" : 3
    //     },
    //     {
    //         "sighting_whale_id" : 7,
    //         "sighting_id" : 4,
    //         "whale_id" : 3
    //     },
    //     {
    //         "sighting_whale_id" : 8,
    //         "sighting_id" : 4,
    //         "whale_id" : 4
    //     },
    //     {
    //         "sighting_whale_id" : 9,
    //         "sighting_id" : 5,
    //         "whale_id" : 1
    //     },
    //     {
    //         "sighting_whale_id" : 10,
    //         "sighting_id" : 5,
    //         "whale_id" : 3
    //     }
    // ]

    // res.send(dummy_data);

    let SQL = "SELECT * FROM Sightings_Whales;"
    return client.query(SQL).then((result) => {
        res.json(result.rows);
    })
    .catch((err) => {
        console.error(err);
    })
});


// @route POST api/sightings_whales
// @desc Insert records into sightings_whales
router.post("/", (req, res) => {
   res.send("This route should handle adding data into the sightings_whales table.")
});

// @route PUT api/sightings_whales
// @desc Update records in sightings_whales
router.put("/", (req, res) => {
    res.send("This route should handle updating data in the sightings_whales table.")
 });


// @route DELETE api/sightings_whales
// @desc Delete records from sightings_whales
router.delete("/", (req, res) => {
    res.send("This route should handle updating data in the species table.")
 });

 module.exports = router;