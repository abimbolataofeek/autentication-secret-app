require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const md5 = require('md5'); //for hashing password
// const encrypt  = require("mongoose-encryption");


const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

// Mongoose-encrption Schema
const userSchema = new mongoose.Schema( {
    email: String,
    password: String
});
 

const User = new mongoose.model("User", userSchema);

app.get("/", function (req, res) {
    res.render("home");

});

app.get("/login", function (req, res) {
    res.render("login");

});

app.get("/register", function (req, res) {
    res.render("register");

});

//Register
app.post("/register", function (req, res) {
    const newUser = new User({
        email: req.body.username,
        password: md5(req.body.password) //hasing password
    });
    newUser.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.render("secrets")
        }
    });
});

// Login

app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ email: username }, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("secrets");
                }
            }
        }
    })
})


app.listen(9000, function () {
    console.log("Server started on port 9000");
});