const express = require("express");
const ejs = require("ejs");
const bodyparser = require("body-parser");
const { resolveSoa } = require("dns");


const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.render("home");
    
});

app.get("/login", function(req, res) {
    res.render("login");
    
});

app.get("/register", function(req, res) {
    res.render("register");
    
});

app.listen(9000, function () {
    console.log("Server started on port 9000");
});