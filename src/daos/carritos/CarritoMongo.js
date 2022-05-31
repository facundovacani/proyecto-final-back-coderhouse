const {ContenedorMongo} = require("../../contenedores/ContenedorMongoDb");
const {carritoModel} = require("../../models/carritoSchema");

class CarritoMongo extends ContenedorMongo{
    constructor() {
        super(carritoModel);
    }
}

module.exports = {CarritoMongo};