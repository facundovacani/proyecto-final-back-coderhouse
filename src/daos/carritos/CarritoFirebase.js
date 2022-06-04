const {ContenedorFirebase} = require("../../contenedores/ContenedorFirebase");
const { db } = require("../../models/carritoSchema");

class CarritoFirebase extends ContenedorFirebase{
    constructor() {
        super("carritos");
        this.id = 1;
        this.verId();
    }

    async verId(){
        let carritos = await this.traerContenido();
        
        if(carritos.length >= 1){
            if(carritos[0].id == 1){

                this.id = (parseInt(carritos[carritos.length - 1].id) + 1);
            }else{
                this.id = 1;
            }
        }
        
    }


    async guardar(){

        try{

            let fecha = new Date();
            let anio = fecha.getFullYear();
            let mes = fecha.getMonth();
            let dia = fecha.getDate();
            let hora = fecha.getHours();
            let minutos = fecha.getMinutes();
            let segundos = fecha.getSeconds();
            let tiempo = `${hora}:${minutos}:${segundos} ${dia}/${mes}/${anio}`;            
            let carro = {
                timestamp: tiempo,
                productos:[]
            };
            let documento = await this.coleccion.doc(`${this.id}`).create(carro);
            this.verId();
            return documento;
        }catch(err){
            return err;
        }
    }

    async guardarItem(objeto, id){
        try{
            let carro = await this.traerItem(id);
            let productos = carro.productos;
            productos.push(objeto);
            await this.coleccion.doc(id).set({
                productos
            },{merge:true})
            return (`Producto '${objeto.nombre}' agregado con exito al carrito`);

        }catch(err){
            return err
        }
    }

    
    async borrarItemCarrito(itemId, id){
        try{
            let carrito = await this.traerItem(id);
            let productos = carrito.productos;
            let index = productos.findIndex(elem => elem.id === itemId )
            productos.splice(index,1);
            await this.coleccion.doc(id).set({
                productos
            })
            return (`Producto '${objeto.nombre}' eliminado del carrito`);

        }catch(err){
            return err
        }
    }

    async borrarItem(id){
        super.borrarItem(id);
        this.id--;
    }
}

module.exports = {CarritoFirebase};