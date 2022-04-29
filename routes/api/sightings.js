// This router handles all API requests involving CRUD operations to the sightings table

const express = require("express");
const router = express.Router();

// TODO: DB integration.

// @route GET api/sightings
// @desc Get all records from the sightings table
router.get("/", (req, res) => {
    res.send("This should return records from the sightings table");
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
