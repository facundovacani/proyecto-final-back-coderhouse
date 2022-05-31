const {ContenedorFirebase} = require("../../contenedores/ContenedorFirebase");

class ProductosFirebase extends ContenedorFirebase{
    constructor(){
        super("productos");
        this.id = 1;
        this.verId();
    }




    async verId(){
        let productos = await this.traerContenido();
        if(productos.length > 0){
            this.id = parseInt((parseInt(productos[productos.length - 1].id) + 1));
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
            stock
        }
        let documento = await this.coleccion.doc(`${this.id}`).create(producto);
        this.id++;
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

module.exports = { ProductosFirebase }