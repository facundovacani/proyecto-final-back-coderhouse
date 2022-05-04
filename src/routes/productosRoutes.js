const express = require("express");
const {Router} = express;
const productosRouter = Router();
const {Productos} = require("../models/Productos");

const productosContenedor = new Productos("./src/data/productos.json"); //hay que poner la ruta como si estuvieramos en el servidor.js
const usuario = {
    admin : true
};
productosRouter.get("/:id?", (req,res)=>{
    let id = req.params.id;
    if(id){
        let producto =  productosContenedor.traerItem(id);
        res.json({producto});   
    }else{
        let productos = productosContenedor.traerContenido();
        res.json({productos});
    }
});


productosRouter.post("/", (req,res)=>{
    if(usuario.admin){
        let producto = req.body;
        if(producto.nombre && producto.descripcion && producto.foto&& producto.precio&& producto.stock){
            producto = productosContenedor.guardar(producto.nombre , producto.descripcion , producto.foto, producto.precio, producto.stock);
            res.json({result: "Producto guardado", producto:producto});
        }else{
            res.json({result: "No se guardó al jugador"});
        }        
    }else{
        res.json({error: -1, descripcion:`ruta '${req.url}' método '${req.method}' no autorizado`})
    }
});

productosRouter.put("/:id", (req,res)=>{
    if(usuario.admin){

        let id = req.params.id;
        let {precio,nombre,foto,stock,descripcion} = req.body;
        let producto;
        if(precio){
            let nuevoPrecio = Math.abs(precio);
            producto = productosContenedor.actualizar(id, "precio", nuevoPrecio);        
        }
        if(nombre){
            producto = productosContenedor.actualizar(id, "nombre", nombre);        
        }
        if(foto){
            producto = productosContenedor.actualizar(id, "foto", foto);        
        }
        if(stock){
            producto = productosContenedor.actualizar(id, "stock", stock);        
        }
        if(descripcion){
            producto = productosContenedor.actualizar(id, "descripcion", descripcion);        
        }
        res.json(producto);
    }else{
        res.json({error: -2, descripcion:`ruta '${req.url}' método '${req.method}' no implementado`})
    }
});


productosRouter.delete("/:id", (req,res)=>{
    if(usuario.admin){
        let id = req.params.id;
        let respuesta = productosContenedor.borrarItem(id);
        res.json({result: respuesta});
    }else{
        res.json({error: -2, descripcion:`ruta '${req.url}' método '${req.method}' no implementado`})
    }

});
module.exports = productosRouter;