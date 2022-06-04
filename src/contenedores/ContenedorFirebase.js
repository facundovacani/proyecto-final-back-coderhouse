let admin = require("firebase-admin");
var serviceAccount = require("../../coder-back-prueba-firebase-adminsdk-na82t-e18860f94b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

class ContenedorFirebase {
    constructor(coleccion){
        this.coleccion = db.collection(coleccion);
        console.log(`Base de datos conectada en colección ${coleccion}`);
    }
    
    async traerContenido(){
        let todo = await this.coleccion.get();
        let mostrar = todo.docs.map(doc => ({
            id:doc.id,
            ...doc.data()
        }));
        return mostrar;
    }
    async traerItem(id){       
        let item = await this.coleccion.doc(`${id}`).get();
        let obj = {
            id: item.id,
            ...item.data()
        }
        return obj;
    }

    async borrarItem(id){
        await this.coleccion.doc(`${id}`).delete();
        return `Elemento con ${id} eliminado`;
    }

 
}

module.exports = {ContenedorFirebase}