const express = require("express");
const app = express();

app.get("/", (req, res) =>{
    res.send("Hello world")
});

// Redirect all unidentified routes
app.get('/*', (req, res) => {
    res.redirect("/");
})

port = 53588
app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
});