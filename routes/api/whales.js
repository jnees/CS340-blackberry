// This router handles all API requests involving CRUD operations to the whales table

const express = require("express");
const router = express.Router();

// TODO: DB integration.

// @route GET api/whales
// @desc Get all records from the whales table
router.get("/", (req, res) => {
    res.send("This should return records from the whales table");
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