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
                    item = "No existe";
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

/*

async deleteById(id){
        try{
            let data = await fs.promises.readFile(this._archivo, "utf-8");
            let array = JSON.parse(data).productos;
            let existe = array.some((e) => e.id == id )
            if(existe){
                let item = array.findIndex(i => i.id == id);
                console.log(`Se eliminó el producto ${array[item].title} con id ${array[item].id}`)
                array.splice(item, 1);
                await fs.promises.writeFile(this._archivo , JSON.stringify({productos: array}));


            }else{
                console.log(`No existe el id ${id} en la lista de productos`)
            }

        }
        catch(err){
            console.warn(err)
        }

    }
*/