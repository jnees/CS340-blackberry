// This router handles all API requests involving CRUD operations to the species table

const express = require("express");
const router = express.Router();

// TODO: DB integration.

// @route GET api/species
// @desc Get all records from the species table
router.get("/", (req, res) => {
    res.send("This should return records from the species table");
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
