// This router handles all API requests involving CRUD operations to the organizations table
require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../../db_pool.js")

// @route GET api/organizations
// @desc Get all records from the organizations table
router.get("/", (req, res) => {
    
    const SQL = "SELECT * FROM Organizations ORDER BY 1 ASC;"
    
    return pool.query(SQL)
        .then((result) => {
            res.json(result.rows)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send("An error occured while getting Organization records.")
        })
});


// @route POST api/organizations
// @desc Insert records into organizations
router.post("/", (req, res) => {
    
    cleanedName = req.body.name.replace(/'/g, "''");

    console.log("Insert organizations request: ", req.body.name, req.body.type);

    // Name required.
    if (req.body.name === ""){
        return res.status(500).send("Error inserting record.")
    }

    let SQL = `INSERT INTO Organizations ("name", "type") \
    VALUES ('${cleanedName}', '${req.body.type}');`
    
    return pool.query(SQL)
        .then((db_res) => {
            res.send("success");
        })
        .catch((err) =>{
            console.log(err)
            res.status(500).send("Error inserting record.")
        });
});


// @route PUT api/organizations
// @desc Update records in organizations
router.put("/", (req, res) => {

    cleanedName = req.body.newName.replace(/'/g, "''");

    console.log("Update organization request: ", req.body);

    // Name required.
    if (req.body.newName === ""){
        return res.status(500).send("Error inserting record.")
    }

    let SQL = `UPDATE Organizations SET \
               "name" = '${cleanedName}', \
               "type" = '${req.body.newType}' \
               WHERE "organization_id" = '${req.body.id}'`

    
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


// @route DELETE api/organizations
// @desc Delete records from organizations
router.delete("/", (req, res) => {
    console.log("Delete organization id: ", req.body.id);
    
    let SQL = `DELETE FROM Organizations WHERE organization_id = ${req.body.id}`

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