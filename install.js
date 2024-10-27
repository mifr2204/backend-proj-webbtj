const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Menu = require("./models/Menu");

//connect database
 
mongoose.set("strictQuery", false);
connection = mongoose.connect(process.env.DATABASE).then(() => {
    console.log("connected to database");
    
}).catch((error) => {
    console.log("error connecting");
});

//clear the database , https://stackoverflow.com/questions/70705744/how-to-delete-all-documents-of-all-collections-in-mongoose
async function clearCollections() {
    const collections = mongoose.connection.collections;
  
    await Promise.all(Object.values(collections).map((collection) =>
      collection.deleteMany({}) 
    ));
}

clearCollections().then(async () =>{
    console.log("Database is reset");

    var menuItems = [
        {
            name: "Margherita",
            type: "pizza",
            description: "Enkel pizza med ost och tomatsås",
            prize: "70"
        },
        {
            name: "Fungi",
            type: "pizza",
            description: "Champinjoner",
            prize: "80"
        },
        {
            name: "Capricciosa",
            type: "pizza",
            description: "Skinka, Champinjoner",
            prize: "90"
        },
        {
            name: "Tuna",
            type: "Tonfisk, lök",
            description: "pizza",
            prize: "95"
        },
        {
            name: "Hawaii",
            type: "pizza",
            description: "Skinka, annanas",
            prize: "100"
        },
        {
            name: "Kebabpizza",
            type: "pizza",
            description: "Kebab, Kebabsås, champinjoner, lök",
            prize: "90"
        },
        {
            name: "Coca-Cola",
            type: "drink",
            description: "Original Coca-cola",
            prize: "10"
        },
        {
            name: "IceCream",
            type: "dessert",
            description: "One scoop of vanilla icecream",
            prize: "30"
        },
        {
            name: "Sause",
            type: "other",
            description: "Extra sause in a jar",
            prize: "20"
        }
    ];

    for (let i=0; i<menuItems.length; i++) {
        await Menu.create(menuItems[i]);
    }

    console.log("Menu items are added");
});




