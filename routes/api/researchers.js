// This router handles all API requests involving CRUD operations to the researchers table
require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../../db_pool.js")

// @route GET api/researchers
// @desc Get all records from the researchers table
router.get("/", (req, res) => {
    
    const SQL = "SELECT Researchers.*, Organizations.name AS organization_name \
                FROM Researchers \
                    LEFT JOIN Organizations \
                        ON Researchers.organization_id = Organizations.organization_id;"
    
    return pool.query(SQL)
        .then((result) => {
            res.json(result.rows)
        })
        .catch((err) => {
            console.log(err)
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