/**
 * Routes for auth
 */

const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//connect database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("connected to database");
}).catch((error) => {
    console.log("error connecting");
});
  
//user model
const User = require("../models/User");

function isEmail(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat)) { return true; }
    
    return false;
}

//New user
router.post("/register", async(req, res) => {
    try{
        const {firstname, lastname, email, username, password} = req.body;
        
        //validate
        if(!username || !password || !lastname || !firstname || !email) {
            return res.status(400).json({ error: "All fields needs to be filled in"});
        }

        if (!isEmail(email)) {
            return res.status(400).json({ error: "Invalid email"});
        }

        //validate exixtens of user
        const userExcists = await User.findOne({ username });
        if(userExcists) {
            return res.status(401).json({error: "Username is taken"});
        }

        //validate exixtens of email
        const emailExcists = await User.findOne({ email });
        if(emailExcists) {
            return res.status(401).json({error: "Email alredy registrated"});
        }

        const user = new User({ firstname, lastname, email, username, password });
        await user.save();

        res.status(201).json({ message: "User is created"});

    }catch(error) {
        res.status(500).json({ error: "server error"});
        console.log(error);
    }
});

//login
router.post("/login", async(req, res) => {
        try{
        const {username, password} = req.body;
        //validate
        if(!username || !password) {
            return res.status(400).json({ error: "invalid input"});
        }

        //validate exixtens of user
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({error: "username or password was not correct"});
        }

        //validate password
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch){
            return res.status(401).json({error: "username or password was not correct"});
        }else{
            //create jwt
            const payload = { username : username};
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn:'30d'});
            const response = {
                message: "user is logged in",
                token: token
            }

            res.status(200).json({ response });
        } 
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: "server error login"});
    }
});

module.exports = router;