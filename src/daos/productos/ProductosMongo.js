const {ContenedorMongo} = require("../../contenedores/ContenedorMongoDb");
const productModel = require("../../models/productosSchema");

class ProductosMongo extends ContenedorMongo{
    constructor() {
        super();

    }
    async traerContenido(){
        let productos = await productModel.find({});
        let todo = productos.map(prod => ({
                id: prod.id,
                timestamp: prod.timestamp,
                nombre: prod.nombre,
                descripcion: prod.descripcion,
                codigo: prod.codigo,
                foto: prod.foto,
                precio: prod.precio,
                stock:prod.stock
            }))
        return todo;
    }
    async borrarItem(id){
        try{
            await productModel.deleteOne({_id:id})
            console.log(`Usuario eliminado`)
        }catch(err){
            console.log(err)
        }
    }
    async traerItem(id){
        try{
            let producto = await productModel.findOne({_id:id});
            return producto;
        }catch(err){
            console.log(err)
        }
    }
    
    async guardar(nombre,descripcion,foto, precio,stock){
        let codigo = Math.round(Math.random()*123524);
        let fecha = new Date();
        let anio = fecha.getFullYear();
        let mes = fecha.getMonth();
        let dia = fecha.getDate();
        let hora = fecha.getHours();        
        let minutos = fecha.getMinutes();
        let segundos = fecha.getSeconds();
        let tiempo = `${hora}:${minutos}:${segundos} ${dia}/${mes}/${anio}`;
        let producto = {   
            timestamp: tiempo,
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock,
        }
        let documento = new productModel(producto);
        let productoGuardado = await documento.save();
        this._id++;
        return productoGuardado;
    }

    
    
    async actualizar(id,atributo, valor){
        try{
            let item = await productModel.updateOne({_id: id}, {$set:{[atributo]:valor}});
            return item;        
        }catch(err){
            return err
        }   
    }
    
}   

module.exports = {ProductosMongo}