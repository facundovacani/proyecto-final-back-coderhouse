const mongoose = require("mongoose");

const carritoShema = new mongoose.Schema({
    timestamp: {type: String, required: true},
    productos: {type: Array, required: true}
})

const carritoModel =  mongoose.model("carritos", carritoShema);
module.exports = {carritoModel}