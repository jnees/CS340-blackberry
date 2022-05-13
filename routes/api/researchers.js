// This router handles all API requests involving CRUD operations to the researchers table
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

// @route GET api/researchers
// @desc Get all records from the researchers table
router.get("/", (req, res) => {
    // dummy_data = [
    //     {
    //         "researcher_id" : 1,
    //         "first_name" : "Abner",
    //         "last_name" : "Benedicto",
    //         "email" : "abenedicto1r@washington.edu",
    //         "organization_id" : 2,
    //         "organization_name": "University of Washington"
    //     },
    //     {
    //         "researcher_id" : 2,
    //         "first_name" : "Adaline",
    //         "last_name" : "Elcott",
    //         "email" : "aelcott0@whaletales.org",
    //         "organization_id" : 1,
    //         "organization_name": "Whale Tales"
    //     },
    //     {
    //         "researcher_id" : 3,
    //         "first_name" : "Farrah",
    //         "last_name" : "Crompton",
    //         "email" : "fcromptonc@whalewatchers.com",
    //         "organization_id" : 3,
    //         "organization_name": "Whale Watchers"
    //     },
    //     {
    //         "researcher_id" : 4,
    //         "first_name" : "Kristel",
    //         "last_name" : "Seaborne",
    //         "email" : "kseabornek@whaletales.org",
    //         "organization_id" : 1,
    //         "organization_name": "Whale Tales"
    //     },
    //     {
    //         "researcher_id" : 5,
    //         "first_name" : "Deva",
    //         "last_name" : "Quiddington",
    //         "email" : "dquiddington3@washington.edu",
    //         "organization_id" : 2,
    //         "organization_name": "University of Washington"
    //     }
    // ];

    // res.json(dummy_data);

    // res.json(dummy_data);
    let SQL = "SELECT * FROM Researchers;"
    return client.query(SQL).then((result) => {
        res.json(result.rows);
    })
    .catch((err) => {
        console.error(err);
    })
});


// @route POST api/researchers
// @desc Insert records into researchers
router.post("/", (req, res) => {
   res.send("This route should handle adding data into the researchers table.")
});

// @route PUT api/researchers
// @desc Update records in researchers
router.put("/", (req, res) => {
    res.send("This route should handle updating data in the researchers table.")
 });


// @route DELETE api/researchers
// @desc Delete records from researchers
router.delete("/", (req, res) => {
    res.send("This route should handle updating data in the researchers table.")
 });

 module.exports = router;