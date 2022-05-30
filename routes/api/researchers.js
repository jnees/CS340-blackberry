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
                        ON Researchers.organization_id = Organizations.organization_id \
                ORDER BY 1 ASC;"
    
    return pool.query(SQL)
        .then((result) => {
            res.json(result.rows)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send("An error occured while getting Researcher records.")
        })
});


// @route POST api/researchers
// @desc Insert records into researchers
router.post("/", (req, res) => {

    cleanedFirstName = req.body.first_name.replace(/'/g, "''");
    cleanedLastName = req.body.last_name.replace(/'/g, "''");

    console.log("Insert researchers request: ", req.body.first_name, 
                req.body.last_name, req.body.email, req.body.organization_id);

    let SQL = "";
    if (req.body.organization_id == ""){
        SQL = `INSERT INTO Researchers ("first_name", "last_name", "email") \
        VALUES ('${cleanedFirstName}', '${cleanedLastName}', \
        '${req.body.email}');`
    } else {
        SQL = `INSERT INTO Researchers ("first_name", "last_name", "email", "organization_id") \
        VALUES ('${cleanedFirstName}', '${cleanedLastName}', \
        '${req.body.email}', '${req.body.organization_id}');`
    }
    
    
    return pool.query(SQL)
        .then((db_res) => {
            res.send("success");
        })
        .catch((err) =>{
            console.log(err)
            res.status(500).send("An error occurred while inserting Researcher record.")
        });
});


// @route PUT api/researchers
// @desc Update records in researchers
router.put("/", (req, res) => {
    console.log("Update researcher request: ", req.body);

    cleanedFirstName = req.body.newFirstName.replace(/'/g, "''");
    cleanedLastName = req.body.newLastName.replace(/'/g, "''");
    
    let SQL = "";
    if(req.body.newOrganization === "" || req.body.newOrganization === "null"){
        SQL = `UPDATE Researchers SET \
        "first_name" = '${cleanedFirstName}', \
        "last_name" = '${cleanedLastName}', \
        "email" = '${req.body.newEmail}', \
        "organization_id" = NULL
        WHERE "researcher_id" = '${req.body.id}'`
    } else {
        SQL = `UPDATE Researchers SET \
        "first_name" = '${cleanedFirstName}', \
        "last_name" = '${cleanedLastName}', \
        "email" = '${req.body.newEmail}', \
        "organization_id" = '${req.body.newOrganization}' \
        WHERE "researcher_id" = '${req.body.id}'`
    }
    
    
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


// @route DELETE api/researchers
// @desc Delete records from researchers
router.delete("/", (req, res) => {
    console.log("Delete researcher id: ", req.body.id);
    
    let SQL = `DELETE FROM Researchers WHERE researcher_id = ${req.body.id}`

    return pool.query(SQL)
        .then((db_res) => {
            console.log(db_res);
            res.send("success");
        })
        .catch((err) =>{
            console.log(err)
            res.status(500).send('Error Deleting Record')
        });
 });

 module.exports = router;