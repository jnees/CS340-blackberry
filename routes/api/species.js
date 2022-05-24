// This router handles all API requests involving CRUD operations to the species table
require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../../db_pool.js")

// @route GET api/species
// @desc Get all records from the species table
router.get("/", (req, res) => {
    
    const SQL = "SELECT * FROM Species;"
    
    return pool.query(SQL)
        .then((result) => {
            res.json(result.rows)
        })
        .catch((err) => {
            console.log(err)
        })
});


// @route POST api/species
// @desc Insert records into species
router.post("/", (req, res) => {

    cleanedDescription = req.body.description.replace(/'/g, "''");

    console.log("Insert species request: ", req.body);

    let SQL = `INSERT INTO Species ("name", "description") \
    VALUES ('${req.body.name}', '${cleanedDescription}');` 
    
    return pool.query(SQL)
        .then((db_res) => {
            res.send("success");
        })
        .catch((err) =>{
            console.log(err)
            res.status(500).send("Error inserting record.")
        });
});


// @route PUT api/species
// @desc Update records in species
router.put("/", (req, res) => {

    cleanedDescription = req.body.newDescription.replace(/'/g, "''");

    console.log("Update species request: ", req.body);
    
    let SQL = `UPDATE Species SET \
               "name" = '${req.body.newName}', \
               "description" = '${cleanedDescription}' \
               WHERE "species_id" = '${req.body.id}';`
    
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


// @route DELETE api/species
// @desc Delete records from species
router.delete("/", (req, res) => {
    console.log("Delete species id: ", req.body.id);
    
    let SQL = `DELETE FROM Species WHERE species_id = ${req.body.id}`

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