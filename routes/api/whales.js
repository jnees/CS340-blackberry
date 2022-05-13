// This router handles all API requests involving CRUD operations to the whales table
require("dotenv").config();
const { response } = require("express");
const express = require("express");
const res = require("express/lib/response");
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


// @route GET api/whales
// @desc Get all records from the whales table
router.get("/", (req, res) => {
    // dummy_data = [
    //     {
    //         "whale_id" : 1,
    //         "name" : "Tahlequah",
    //         "birthyear" : 1998,
    //         "is_female" : 1,
    //         "is_transient" : 0,
    //         "species_id" : 1
    //     },
    //     {
    //         "whale_id" : 2,
    //         "name" : "Blackberry",
    //         "birthyear" : 1991,
    //         "is_female" : 0,
    //         "is_transient" : 0,
    //         "species_id" : 1
    //     },
    //     {
    //         "whale_id" : 3,
    //         "name" : "Oreo",
    //         "birthyear" : 1985,
    //         "is_female" : 1,
    //         "is_transient" : 0,
    //         "species_id" : 1
    //     },
    //     {
    //         "whale_id" : 4,
    //         "name" : "Alki",
    //         "birthyear" : 1999,
    //         "is_female" : 1,
    //         "is_transient" : 0,
    //         "species_id" : 1
    //     }
    // ]

    // res.json(dummy_data);
    
    let SQL = "SELECT * FROM Whales;"
    return client.query(SQL).then((result) => {
        res.json(result.rows);
    })
    .catch((err) => {
        console.error(err);
    })
});

// @route POST api/whales
// @desc Insert records into whales
router.post("/", (req, res) => {
   res.send("This route should handle adding data into the whales table.")
});

// @route PUT api/whales
// @desc Update records in whales
router.put("/", (req, res) => {
    console.log("req.body = ", req.body);
    let values = [
        req.body.name,
        req.body.birthyear,
        req.body.is_female,
        req.body.is_transient,
        req.body.species,
        req.body.id
    ]
    let SQL = "UPDATE Whales SET name = $1, birthyear = $2, is_female = $3, is_transient = $4, species_id = $5 WHERE whale_id = $6"
    
    return client.query(SQL).then((result) => {
        res.redirect("/whales")
    })
    .catch((err) => {
        console.error(err);
    })
 });


// @route DELETE api/whales
// @desc Delete records from whales
router.delete("/", (req, res) => {
    res.send("This route should handle updating data in the species table.")
 });


 module.exports = router;