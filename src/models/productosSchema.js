const mongoose = require("mongoose");

const productoShema = new mongoose.Schema({
    timestamp: {type: String, required: true},
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    codigo: {type: Number, required: true},
    foto: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true}
})

 
module.exports = mongoose.model("productos", productoShema);