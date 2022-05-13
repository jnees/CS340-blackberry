// This router handles all API requests involving CRUD operations to the sightings table
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

// @route GET api/sightings
// @desc Get all records from the sightings table
router.get("/", (req, res) => {
    // dummy_data = [
    //     {
    //         "sighting_id" : 1,
    //         "datetime" : "2021-03-27 18:19:00",
    //         "latitude" : 47.614081,
    //         "longitude" : -122.389926,
    //         "researcher_id" : 1,
    //         "whale_ids": "1, 2"
    //     },
    //     {
    //         "sighting_id" : 2,
    //         "datetime" : "2021-09-29 02:45:00",
    //         "latitude" : 47.648136,
    //         "longitude" : -122.493726,
    //         "researcher_id" : 3,
    //         "whale_ids": "4"
    //     },
    //     {
    //         "sighting_id" : 3,
    //         "datetime" : "2021-04-26 07:19:00",
    //         "latitude" : 47.739778,
    //         "longitude" : -122.458992,
    //         "researcher_id" : 4,
    //         "whale_ids": "1, 2, 3"
    //     },
    //     {
    //         "sighting_id" : 4,
    //         "datetime" : "2021-03-19 07:39:00",
    //         "latitude" : 47.577108,
    //         "longitude" : -122.440209,
    //         "researcher_id" : 2,
    //         "whale_ids": "3, 4"
    //     },
    //     {
    //         "sighting_id" : 5,
    //         "datetime" : "2021-04-30 05:04:00",
    //         "latitude" : 47.546325,
    //         "longitude" : -122.446280,
    //         "researcher_id" : 5,
    //         "whale_ids": "1, 3"
    //     }
    // ]

    // res.send(dummy_data);
    let SQL = "SELECT * FROM Sightings;"
    return client.query(SQL).then((result) => {
        res.json(result.rows);
    })
    .catch((err) => {
        console.error(err);
    })
    
});


// @route POST api/sightings
// @desc Insert records into sightings
router.post("/", (req, res) => {
   res.send("This route should handle adding data into the sightings table.")
});

// @route PUT api/sightings
// @desc Update records in sightings
router.put("/", (req, res) => {
    res.send("This route should handle updating data in the sightings table.")
 });


// @route DELETE api/sightings
// @desc Delete records from sightings
router.delete("/", (req, res) => {
    res.send("This route should handle updating data in the species table.")
 });

 module.exports = router;