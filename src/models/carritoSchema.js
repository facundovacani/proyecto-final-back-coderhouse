const mongoose = require("mongoose");

const carritoShema = new mongoose.Schema({
    timestamp: {type: String, required: true},
    productos: {type: Array, required: true},
    carritoId: {type: Number, required: true}
})

module.exports = mongoose.model("carritos", carritoShema);