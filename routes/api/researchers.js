// This router handles all API requests involving CRUD operations to the researchers table

const express = require("express");
const router = express.Router();

// TODO: DB integration.

// @route GET api/researchers
// @desc Get all records from the researchers table
router.get("/", (req, res) => {
    res.send("This should return records from the researchers table");
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