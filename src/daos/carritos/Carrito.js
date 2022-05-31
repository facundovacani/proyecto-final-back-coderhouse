const {Contenedor} = require("../../contenedores/Contenedor");
class Carrito extends Contenedor{
    constructor(archivo){
        super(archivo);
        let carrito = this.traerContenido();
        this.id = (carrito.length > 0)? carrito.length + 1 : 1; 
    }

    guardar(){

        try{

            let carrito = this.traerContenido();            
            let fecha = new Date();
            let anio = fecha.getFullYear();
            let mes = fecha.getMonth();
            let dia = fecha.getDate();
            let hora = fecha.getHours();
            let minutos = fecha.getMinutes();
            let segundos = fecha.getSeconds();
            let tiempo = `${hora}:${minutos}:${segundos} ${dia}/${mes}/${anio}`;
            let id;
            if(carrito.length === 0){
                id = 1;
            }else if(carrito[0].id > 1){
                id = 1;
            }else if(carrito[1].id >1){
                id = carrito[carrito.length-1].id +1;
            }
            let carro = {
                id,
                timestamp: tiempo,
                productos:[]
            };
            carrito.push(carro);
            this.guardarArchivo(carrito);
            return carro.id;
        }catch(err){
            return err
        }
    }

    guardarItem(objeto, id){
        try{
            let carritos = this.traerContenido();                   
            carritos.find((elem) => elem.id == id).productos.push(objeto);
            this.guardarArchivo(carritos);
            return (`Producto '${objeto.nombre}' agregado con exito al carrito`);

        }catch(err){
            return err
        }
    }

    borrarItemCarrito(itemId, id){
        try{
            let carritos = this.traerContenido();                   
            let index = carritos.find((elem) => elem.id == id).productos.findIndex(elem => elem.id == itemId);
            carritos.find(elem => elem.id == id).productos.splice(index, 1);
            this.guardarArchivo(carritos);
            return (`Producto '${objeto.nombre}' eliminado del carrito`);

        }catch(err){
            return err
        }
    }

}

module.exports = {Carrito};