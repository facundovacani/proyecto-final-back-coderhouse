const {Contenedor} = require("./Contenedor");
class Productos extends Contenedor{
    constructor(archivo){
        super(archivo);
        let productos = this.traerContenido();
        this.id = (productos.length > 0)? productos.length + 1 : 1; 
    }
    
    guardar(nombre,descripcion,foto, precio,stock){
        let productos = this.traerContenido();
        let codigo = Math.random()*12312;
        let fecha = new Date();
        let anio = fecha.getFullYear();
        let mes = fecha.getMonth();
        let dia = fecha.getDate();
        let hora = fecha.getHours();
        let minutos = fecha.getMinutes();
        let segundos = fecha.getSeconds();
        let tiempo = `${hora}:${minutos}:${segundos} ${dia}/${mes}/${anio}`;
        let producto = {
            id:this.id,
            timestamp: tiempo,
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock
        }
        productos.push(producto);
        this.guardarArchivo(productos);
        this.id++;
    }

    actualizar(id,atributo, valor){
        try{
        let productos = this.traerContenido();
        let existe = productos.some(elm => elm.id == id);
            if(existe){
                let index = productos.findIndex(elem => elem.id == id);
                productos[index][atributo] = valor;
                this.guardarArchivo(productos);             
                return {result: "Se cambio el producto"};
            }else{
                throw "No existe";
            }
        }catch(err){
            return err
        }   
    }
}

module.exports = {Productos};