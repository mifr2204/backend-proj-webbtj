/*
 * Applikation för registrering av användare inloggning 
och lagring av Arbetslivserfarenheter
 * Av Mikaela Frendin
 */

const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const authRoutes = require("./routes/authRoutes");
const Menu = require("./models/Menu");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");

  

//inställningar för databasen
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

//routes
app.use("/api", authRoutes);


//validate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) res.status(401).json({ message: "Token is missing" });
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) return res.status(401).json({ message: "JWT is not correct" });

        req.username = username;
        next();
    })
}

//Start av applikationen
app.listen(port, () => {
    console.log("Started on port: " + port);
});


//get all menu items
app.get("/api/menu", async(req, res) => {
    try {
        let q = {};
        if (req.query.category) {
            q.type = req.query.category;
        } 
        let result = await Menu.find(q);

        return res.json(result);
    }catch(error) {
        return res.status(500).json(error);
    }
});


//creates a new item
app.post("/api/menu", authenticateToken, async(req, res) => {
    try {
        let result = await Menu.create(req.body);
        return res.json(result);
    }catch(error) {
        return res.status(400).json(error);
    }
});

//radera meny item
app.delete("/api/menu/:id", authenticateToken, async(req, res) => {
    
    try {
        let id = req.params.id;
        
        let result = await Menu.deleteOne({_id: id}); 
        
        res.json({message: "The menu item is deleted ", id});    
    
    }catch(error) {
        //console.log(error);
        return res.status(400).json(error);
    };
});

//changes menu item
app.put("/api/menu/:id", authenticateToken, async(req, res) => {
    try {
        console.dir(req.body);
        let id = req.params.id;
        let name = req.body.name;
        let type = req.body.type;
        let description = req.body.description;
        let prize = req.body.prize;
  
        let result = await Menu.findOne({_id: id});
            result.name = name; 
            result.type = type; 
            result.description = description; 
            result.prize = prize;
            console.log(result.prize);
            result.save().then((data) => {
                return res.status(200).json(data);
            }, (error) => {
                return res.status(400).json(error);
            });
        
    }catch(error) {
       
        return res.status(500).json(error);
    };
});

/*





//app.use(express.json());
//app.use(cors());

/*







*/