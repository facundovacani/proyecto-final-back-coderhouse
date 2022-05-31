const {ContenedorMongo} = require("../../contenedores/ContenedorMongoDb");
const {productModel} = require("../../models/productosSchema");

class ProductosMongo extends ContenedorMongo{
    constructor() {
        super(productModel);
        this.id = 1;
        this.verId()
    }

    async verId(){
        let productos = await this.traerContenido();
        if(productos.length > 0){
            this._id = parseInt((parseInt(productos[productos.length - 1].id) + 1));
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
            _id: this._id,    
            timestamp: tiempo,
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock
        }
        let documento = await this.coleccion.insertOne(producto);
        this._id++;
        return documento;
    }

    
    
    async actualizar(id,atributo, valor){
        try{
            let doc = this.coleccion.doc(`${id}`);
            let item = await doc.update({[atributo]: valor});    
            return item;        
        }catch(err){
            return err
        }   
    }
    
}   

module.exports = {ProductosMongo}