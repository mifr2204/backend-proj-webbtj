const mongoose = require("mongoose");

//schema Menu
const MenuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name of item has to be filled in"],
    },
    type: {
        type: String,
        required: [true, "Type of item has to be filled in"],
    }, 
    description: {
        type: String,
        required: [true, "description of the item has to be filled in"],
    },
    prize: {
        type: Number,
        required: [true, "Prize has to be filled in with numbers"],
    },
    added: {
        type: Date,
        default: Date.now
    }

});

const Menu = mongoose.model("Menu", MenuSchema);
module.exports = Menu;