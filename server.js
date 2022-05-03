const express = require("express");
const path = require('path');
const species = require("./routes/api/species");
const whales = require("./routes/api/whales");
const researchers = require("./routes/api/researchers");
const organizations = require("./routes/api/organizations");
const sightings = require("./routes/api/sightings");
const sightings_whales = require("./routes/api/sightings_whales");

const app = express();

// Add req.body to all requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Use the React client build (for Heroku deployment)
if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));
}
console.log("path to build: " + path.join(__dirname, 'client/build'))

app.get("/", (req, res) =>{
    res.send("Hello world")
});

// API routes
app.use("/api/species", species);
app.use("/api/whales", whales);
app.use("/api/researchers", researchers);
app.use("/api/organizations", organizations);
app.use("/api/sightings", sightings);
app.use("/api/sightings_whales", sightings_whales);


// Redirect all unidentified routes
app.get('/*', (req, res) => {
    res.redirect("/");
})

const port = process.env.PORT || 53588;
app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
});