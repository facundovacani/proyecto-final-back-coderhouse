const {ContenedorMongo} = require("../../contenedores/ContenedorMongoDb");
const carritoModel = require("../../models/carritoSchema");

class CarritoMongo extends ContenedorMongo{
    constructor() {
        super();
        this.id = 1;
        this.verId();
    }
    async traerContenido(){
        let carritos = await carritoModel.find({});
        let todo = carritos.map(car => ({ 
            productos: car.productos,
            timestamp: car.timestamp,
            id: car._doc.carritoId
        }))
        return todo;
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
                productos:[],
                carritoId: this.id
            };
            let guardado = new carritoModel(carro);
            let obj = await guardado.save();
            this.id++;
        }catch(err){
            return err;
        }
    }

    async traerItem(id){
        try{
            let carrito = await carritoModel.find({carritoId:id});
            let carro = carrito.map(car => ({ 
                productos: car.productos,
                timestamp: car.timestamp,
                id: car._doc.carritoId
            }))
            return carro[0];
        }catch(err){
            console.log(err)
        }
    }

    async verId(){
        let carritos = await this.traerContenido();
        if(carritos.length > 0){
            this.id = (parseInt(carritos[carritos.length - 1].id) + 1);
        }
    }

    // async guardarItem(objeto, id){
    //     try{
    //         let carritos = this.traerContenido();                   
    //         carritos.find((elem) => elem.id == id).productos.push(objeto);
    //         this.guardarArchivo(carritos);
    //         return (`Producto '${objeto.nombre}' agregado con exito al carrito`);

    //     }catch(err){
    //         return err
    //     }
    // }

    // async borrarItemCarrito(itemId, id){
    //     try{
    //         let carritos = this.traerContenido();                   
    //         let index = carritos.find((elem) => elem.id == id).productos.findIndex(elem => elem.id == itemId);
    //         carritos.find(elem => elem.id == id).productos.splice(index, 1);
    //         this.guardarArchivo(carritos);
    //         return (`Producto '${objeto.nombre}' eliminado del carrito`);

    //     }catch(err){
    //         return err
    //     }
    // }
    

}

module.exports = {CarritoMongo};