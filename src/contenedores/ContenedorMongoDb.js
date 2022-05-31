const mongoose = require('mongoose');
const { MONGO_URL } = require("../config/config");

class ContenedorMongo {
    constructor(coleccion) {        
        mongoose.connect(MONGO_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }, () => console.log("Mongo Atlas conectado"))
        this.coleccion = coleccion;
    }
    async traerContenido(){
        return await this.coleccion.find();
    }

    async borrarItem(id){
        try{
            await this.coleccion.deleteOne({id:id})
        }catch(err){
            console.log(err)
        }
    }
    async traerItem(id){
        try{
            await this.coleccion.find({id:id});
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = {ContenedorMongo};