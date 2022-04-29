// This router handles all API requests involving CRUD operations to the sightings_whales table

const express = require("express");
const router = express.Router();

// TODO: DB integration.

// @route GET api/sightings_whales
// @desc Get all records from the sightings_whales table
router.get("/", (req, res) => {
    res.send("This should return records from the sightings_whales table");
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
