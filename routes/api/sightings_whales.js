// This router handles all API requests involving CRUD operations to the sightings_whales table
require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../../db_pool.js")

// @route GET api/sightings_whales
// @desc Get all records from the sightings_whales table
router.get("/", (req, res) => {
    let SQL;
    
    if (!req.body.whale_name){
        SQL = "SELECT Sightings_Whales.*, Whales.name AS whale_name \
        FROM Sightings_whales \
            LEFT JOIN Whales \
                ON Sightings_Whales.whale_id = Whales.whale_id \
        ORDER BY 1, 2;"
    } else {
        SQL = `SELECT Sightings_Whales.*, Whales.name AS whale_name \
        FROM Sightings_whales \
            LEFT JOIN Whales \
                ON Sightings_Whales.whale_id = Whales.whale_id \
        WHERE Whales.whale_name == '${req.body.whale_name}' \
        ORDER BY 1, 2;`
    }


    return pool.query(SQL)
        .then((result) => {
            res.json(result.rows)
        })
        .catch((err) => {
            console.log(err)
        })
});



// @route POST api/sightings_whales
// @desc Insert records into sightings_whales
router.post("/", (req, res) => {

    cleanedWhaleName = req.body.whale_name.replace(/'/g, "''");

    console.log("Insert sightings_whales request: ", req.body.whale_name, 
                req.sighting_id);

    let SQL = `INSERT INTO Sightings_Whales ("sighting_id", "whale_id") \
    VALUES ('${req.body.sighting_id}', (SELECT whale_id FROM Whales WHERE name = '${cleanedWhaleName}'));`
    
    return pool.query(SQL)
        .then((db_res) => {
            res.send("success");
        })
        .catch((err) =>{
            console.log(err)
            res.status(500).send("Error inserting record.")
        });
});


// @route PUT api/sightings_whales
// @desc Update records in sightings_whales
router.put("/", (req, res) => {
    console.log("Update sighting_whale request: ", req.body);

    cleanedWhaleName = req.body.newWhaleName.replace(/'/g, "''");

    let SQL = `UPDATE Sightings_Whales SET \
               "sighting_id" = '${req.body.newSightingID}', \
               "whale_id" = (SELECT whale_id FROM Whales WHERE name = '${cleanedWhaleName}') \
               WHERE "sighting_whale_id" = '${req.body.id}'`
    
    return pool.query(SQL)
        .then((db_res) => {
            console.log(db_res);
            res.send("success");
        })
        .catch((err) =>{
            console.log(err)
            res.status(500).send("An error occured updating the record.")
        });
 });


// @route DELETE api/sightings_whales
// @desc Delete records from sightings_whales
router.delete("/", (req, res) => {
    console.log("Delete sighting_whale id: ", req.body.id);
    
    let SQL = `DELETE FROM Sightings_Whales WHERE sighting_whale_id = ${req.body.id}`

    return pool.query(SQL)
        .then((db_res) => {
            console.log(db_res);
            res.send("success");
        })
        .catch((err) =>{
            console.log(err)
            res.status(500).send('Error Updating Record')
        });
 });
 module.exports = router;