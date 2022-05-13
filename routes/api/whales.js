// This router handles all API requests involving CRUD operations to the whales table

const express = require("express");
const router = express.Router();
const pool = require("../../db_pool.js")

// @route GET api/whales
// @desc Get all records from the whales table
router.get("/", (req, res) => {
    
    const SQL = "SELECT * FROM Whales;"
    
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
    console.log(req.body);

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
        })
});

// @route PUT api/whales
// @desc Update records in whales
router.put("/", (req, res) => {
    console.log("req.body = ", req.body);
    let values = [
        req.body.name,
        req.body.birthyear,
        req.body.is_female,
        req.body.is_transient,
        req.body.species,
        req.body.id
    ]
    let SQL = "UPDATE Whales SET name = $1, birthyear = $2, is_female = $3, is_transient = $4, species_id = $5 WHERE whale_id = $6"
    
    return client.query(SQL).then((result) => {
        res.redirect("/whales")
    })
    .catch((err) => {
        console.error(err);
    })
 });


// @route DELETE api/whales
// @desc Delete records from whales
router.delete("/", (req, res) => {
    res.send("This route should handle updating data in the species table.")
 });


 module.exports = router;