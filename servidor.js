const express = require("express");
const app = express();
const { MONGO_URL, PORT } = require("./src/config/config");
const productosRouter = require("./src/routes/productosRoutes"); 
const carritoRouter = require("./src/routes/carritoRouter");
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({extended:true})); 
app.use("/api/productos", productosRouter);
app.use(express.static("public"));
app.use("/api/carrito", carritoRouter);

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, () => console.log("Mongo Atlas conectado"))
app.get("/", (req,res)=>{
    res.sendFile(__dirname +"public/index.html");
})
app.get("*", (req,res)=>{
    res.json({error: -2, descripcion:`ruta '${req.url}' método '${req.method}' no implementado`})
})
app.post("*", (req,res)=>{
    res.json({error: -2, descripcion:`ruta '${req.url}' método '${req.method}' no implementado`})
})
app.put("*", (req,res)=>{
    res.json({error: -2, descripcion:`ruta '${req.url}' método '${req.method}' no implementado`})
})
app.delete("*", (req,res)=>{
    res.json({error: -2, descripcion:`ruta '${req.url}' método '${req.method}' no implementado`})
})
app.listen(PORT, ()=>{
    console.log("Server ON in " + PORT);
})