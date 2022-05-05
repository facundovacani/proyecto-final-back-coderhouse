const fs = require("fs");

class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
    }

    guardarArchivo(contenido){
        try{
            fs.writeFileSync(this.archivo,JSON.stringify(contenido));

        }catch(err){
            console.warn(err);
        }
    }

    traerContenido(){
        let contenido = [];

        try{
            let arch = fs.readFileSync(this.archivo, "utf-8");
            contenido = JSON.parse(arch);
        }catch(err){
            this.guardarArchivo(contenido);
            console.log("Archivo guardado")
        }

        return contenido;
    }

    traerItem(id){

        try{
            let items = this.traerContenido();
            let item;
    
            if(items.length > 0){
                let elemento = items.find(i => i.id == id);
                if(elemento){
                    item = elemento;                    
                }else{
                    item = false;
                }
            }
            return item;
    

        }catch(err){
            return err
        }

    }

    borrarItem(id){
        try{
            let items = this.traerContenido();
            let existe = items.some(elm => elm.id == id);
            if(existe){
                let index = items.findIndex(elem => elem.id == id);
                items.splice(index,1);
                this.guardarArchivo(items);             
                return "Se elimino el producto";
            }else{
                throw "No existe";
            }
        }catch(err){
            return err;
        }

    }
}

module.exports = {Contenedor};

