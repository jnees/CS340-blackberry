// This router handles all API requests involving CRUD operations to the whales table

const express = require("express");
const router = express.Router();
const pool = require("../../db_pool.js")

// @route GET api/whales
// @desc Get all records from the whales table
router.get("/", (req, res) => {
    
    const SQL = "SELECT Whales.*, Species.name AS species_name \
                 FROM Whales \
                    Left Join Species ON Species.species_id = Whales.species_id;"
    
    return pool.query(SQL)
        .then((result) => {
            res.json(result.rows)
        })
        .catch((err) => {
            console.log(err)
        })
});


// @route POST api/whales
// @desc Insert records into whales
router.post("/", (req, res) => {
    console.log("Insert whale request: " + req.body);

    let SQL = `INSERT INTO Whales ("name", "birthyear", "is_female", "is_transient", "species_id")  \ 
    VALUES ('${req.body.name}', '${req.body.birthyear}', '${req.body.is_female}', \
    '${req.body.is_transient}', '${req.body.species_id}');`
    
    return pool.query(SQL)
        .then((db_res) => {
            console.log(db_res);
            res.send("success");
        })
        .catch((err) =>{
            console.log(err)
            res.send("error")
        });
});

// @route PUT api/whales
// @desc Update records in whales
router.put("/", (req, res) => {
    console.log("Update whale request: ", req.body);
    
    let SQL = `UPDATE WHALES SET \
               "name" = '${req.body.newName}', \
               "birthyear" = '${req.body.newBirthyear}', \
               "is_female" = '${req.body.newGender}', \
               "is_transient" = '${req.body.newTransient}', \
               "species_id" = '${req.body.newSpecies}' \
               WHERE whale_id = '${req.body.id}'`
    
    return pool.query(SQL)
        .then((db_res) => {
            console.log(db_res);
            res.send("success");
        })
        .catch((err) =>{
            console.log(err)
            res.send("error")
        });
 });


// @route DELETE api/whales
// @desc Delete records from whales
router.delete("/", (req, res) => {
    console.log("Delete whale id: ", req.body.id);
    
    let SQL = `DELETE FROM Whales WHERE whale_id = ${req.body.id}`

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