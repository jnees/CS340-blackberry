// This router handles all API requests involving CRUD operations to the whales table
require("dotenv").config();
const { response } = require("express");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const pg = require("pg");

pg.sslmode = "require";
const client = new pg.Client(process.env.DATABASE_URL);
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
    SQL = "SELECT * FROM Whales;"
    return client.query(SQL).then((result) => {
        console.log(process.env.DATABASE_URL)
        res.json(result.rows)
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
    res.send("This route should handle updating data in the whales table.")
 });


// @route DELETE api/whales
// @desc Delete records from whales
router.delete("/", (req, res) => {
    res.send("This route should handle updating data in the species table.")
 });

 module.exports = router;