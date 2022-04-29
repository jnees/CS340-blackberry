// This router handles all API requests involving CRUD operations to the organizations table

const express = require("express");
const router = express.Router();

// TODO: DB integration.

// @route GET api/organizations
// @desc Get all records from the organizations table
router.get("/", (req, res) => {
    res.send("This should return records from the organizations table");
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
