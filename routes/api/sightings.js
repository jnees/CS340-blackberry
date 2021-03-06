// This router handles all API requests involving CRUD operations to the researchers table
require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../../db_pool.js")

// @route GET api/sightings
// @desc Get all records from the sightings table
router.get("/", (req, res) => {
    
    const SQL = "SELECT Sightings.*, CONCAT(Researchers.first_name, ' ', Researchers.last_name) AS researcher_name \
                FROM Sightings \
                    LEFT JOIN Researchers \
                        ON Sightings.researcher_id = Researchers.researcher_id \
                    ORDER BY 1 ASC;"
    
    return pool.query(SQL)
        .then((result) => {
            res.json(result.rows)
        })
        .catch((err) => {
            console.log(err)
        })
});


// @route POST api/sightings
// @desc Insert records into sightings
router.post("/", (req, res) => {

    researcherNames = req.body.researcher_name.split(" ")
    cleanedResearcherFirstName = researcherNames[0].replace(/'/g, "''");
    cleanedResearcherLastName = researcherNames[1].replace(/'/g, "''")

    console.log("Insert sighting request: ", req.body);

    let SQL = `INSERT INTO Sightings ("datetime", "latitude", "longitude", "researcher_id") \
        VALUES ('${req.body.datetime}', '${req.body.latitude}', \
        '${req.body.longitude}', (SELECT researcher_id FROM Researchers WHERE first_name = '${cleanedResearcherFirstName}' AND last_name = '${cleanedResearcherLastName}'));` 
    
    return pool.query(SQL)
        .then((db_res) => {
            res.send("success");
        })
        .catch((err) =>{
            console.log(err)
            res.status(500).send("Error inserting record.")
        });
});


// @route PUT api/sightings
// @desc Update records in sightings
router.put("/", (req, res) => {

    console.log("Update sighting request: ", req.body);

    researcherNames = req.body.newResearcherName.split(" ")
    cleanedResearcherFirstName = researcherNames[0].replace(/'/g, "''");
    cleanedResearcherLastName = researcherNames[1].replace(/'/g, "''")
    
    let SQL = `UPDATE Sightings SET \
               "datetime" = '${req.body.newDatetime}', \
               "latitude" = '${req.body.newLatitude}', \
               "longitude" = '${req.body.newLongitude}', \
               "researcher_id" = (SELECT researcher_id FROM Researchers WHERE first_name = '${cleanedResearcherFirstName}' AND last_name = '${cleanedResearcherLastName}') \
               WHERE "sighting_id" = '${req.body.id}'`
    
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


// @route DELETE api/sightings
// @desc Delete records from sightings
router.delete("/", (req, res) => {
    console.log("Delete sighting id: ", req.body.id);
    
    let SQL = `DELETE FROM Sightings WHERE sighting_id = ${req.body.id}`

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