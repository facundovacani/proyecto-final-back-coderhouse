const express = require("express");
const res = require("express/lib/response");
const {Router} = express;
const carritoRouter = Router();
const { Carrito } = require("../models/Carrito");
const {Productos} = require("../models/Productos");
const carritoContenedor = new Carrito("./src/data/carritos.json");
const productosContenedor = new Productos("./src/data/productos.json");

carritoRouter.post("/",(req,res)=>{
    let carro = carritoContenedor.guardar();
    res.json({carro});
})

carritoRouter.delete("/:id", (req,res)=>{
    let id = req.params.id;
    let respuesta = carritoContenedor.borrarItem(id);
    res.json({result: respuesta});

});

carritoRouter.get("/:id/productos", (req,res)=>{
    let id = req.params.id;
    let carrito = carritoContenedor.traerItem(id);
    if(carrito){
        let productos = carrito.productos;
        let idCarrito = carritoContenedor.id;
        res.json({carrito:productos, id: idCarrito});
    }else{
        res.json({result: "No se encuentra el carrito"});
    }
});

carritoRouter.post("/:id/productos/:id_prod", (req,res)=>{
    let id = req.params.id;
    let productoId = req.params.id_prod;
    let carrito = carritoContenedor.traerItem(id);
    if(carrito != "No existe"){
        let producto = productosContenedor.traerItem(productoId);
        if(producto == "No existe"){
            res.json({result: "No existe el producto con ese id"});
        }else{
            let resultado = carritoContenedor.guardarItem(producto, id);
            res.json({resultado});

        }
    }else{
        res.json({result: "No se encuentra el carrito"});
    }
});
carritoRouter.delete("/:id/productos/:id_prod", (req,res)=>{
    let id = req.params.id;
    let productoId = req.params.id_prod;
    let carrito = carritoContenedor.traerItem(id);
    if(carrito != "No existe"){
        let resultado = carritoContenedor.borrarItemCarrito(productoId, id);
        res.json({resultado});
    }else{
        res.json({result: "No se encuentra el carrito"});
    }
});

module.exports = carritoRouter;