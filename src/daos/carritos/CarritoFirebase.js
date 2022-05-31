const {ContenedorFirebase} = require("../../contenedores/ContenedorFirebase");

class CarritoFirebase extends ContenedorFirebase{
    constructor() {
        super("carritos");
        this.id = 1;
        this.verId();
    }

    async verId(){
        let carritos = await this.traerContenido();
        if(carritos.length > 0){
            this.id = (parseInt(carritos[carritos.length - 1].id) + 1);
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
            return documento;
        }catch(err){
            return err;
        }
    }

    async guardarItem(objeto, id){
        try{
            let carritos = await this.traerContenido();           
            let objetos = carritos[0].productos;
            console.log(objetos)
            objetos.push(objeto);
            await this.coleccion.doc(`${id}`).update({productos: [objetos]})
            return (`Producto '${objeto.nombre}' agregado con exito al carrito`);

        }catch(err){
            return err
        }
    }
}

module.exports = {CarritoFirebase};