// This router handles all API requests involving CRUD operations to the organizations table
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

// @route GET api/organizations
// @desc Get all records from the organizations table
router.get("/", (req, res) => {
    // dummy_data = [
    //     {
    //         "organization_id" : 1,
    //         "name" : "Whale Tales",
    //         "type" : "Non-profit"
    //     },
    //     {
    //         "organization_id" : 2,
    //         "name" : "University of Washington",
    //         "type" : "Educational"
    //     },
    //     {
    //         "organization_id" : 3,
    //         "name" : "Whale Watchers",
    //         "type" : "Tourism"
    //     }
    // ]
    // res.json(dummy_data);

    // res.json(dummy_data);
    let SQL = "SELECT * FROM Organizations;"
    return client.query(SQL).then((result) => {
        res.json(result.rows);
    })
    .catch((err) => {
        console.error(err);
    })
});


// @route POST api/organizations
// @desc Insert records into organizations
router.post("/", (req, res) => {
   res.send("This route should handle adding data into the organizations table.")
});

// @route PUT api/organizations
// @desc Update records in organizations
router.put("/", (req, res) => {
    res.send("This route should handle updating data in the organizations table.")
 });


// @route DELETE api/organizations
// @desc Delete records from organizations
router.delete("/", (req, res) => {
    res.send("This route should handle updating data in the organizations table.")
 });

 module.exports = router;