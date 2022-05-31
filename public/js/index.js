const $botonProductos = document.querySelector("#irProductos");
const $botonCarrito = document.querySelector("#irCarrito");
let numidCarrito = 1; 

function cambioFetch(url, id = false, idC = 1) {
    // console.log(idC)
    // console.log(numidCarrito);
    if (url == "/api/carrito") {
        if (idC) {
            fetch(`http://localhost:8080${url}/${idC}/productos`).then(res => res.json()).then((data) => {
                if(data.carrito != undefined){

                    
                    let contenido = `
                        <table>
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Borrar</th>
                                </tr>
                            </thead>
                            <tbody id="productosCarrito">
                                    
                            </tbody>
                        </table>
                        <button id="borrar-todo-carro">Borrar Todo</button>
                    `;
                    document.querySelector(".seccion").innerHTML = contenido;
                    let tabla = document.querySelector("#productosCarrito");
                    let carro = data.carrito;
                    let datos = "";
                    for (let item of carro) {
                        datos += `
                            
                            <tr>
                                <td><img class="foto" src="${item.foto}"/></td>
                                <td>${item.nombre}</td>
                                <td>${item.descripcion}</td>
                                <td>${item.precio} $</td>
                                <td><button class="borrar-del-carrito" id="${item.id}">Borrar</button></td>            
                            </tr>
                        `
                    }
                    tabla.innerHTML = datos;                    
                    let $aside = document.querySelector(".formulario");
                    $aside.innerHTML = ``;
                    let $borrarDelCarro = document.querySelectorAll(".borrar-del-carrito");
                    $borrarDelCarro.forEach(elem => {
                        elem.addEventListener("click", (e)=>{
                            let ide = e.target.id;
                            fetch(`http://localhost:8080/api/carrito/${idC}/productos/${ide}`, {
                                method: 'DELETE'
                            }).then(data => data.json()).finally(() => {
                                window.location.href = `http://localhost:8080/`
                            });
                        })
                    })

                    let $borrarTodoElCarro = document.getElementById("borrar-todo-carro");
                    $borrarTodoElCarro.addEventListener("click", (e)=>{
                        fetch(`http://localhost:8080/api/carrito/${idC}`, {
                            method: 'DELETE'
                        }).then(data => data.json()).finally(() => {
                            numidCarrito+=1
                            window.location.href = `http://localhost:8080/`
                        });
                    })
                    return true;
                }else{
                    document.querySelector(".seccion").innerHTML = `<h1> No hay carrito </h1>
                    <br>
                    <button id="crear-carrito-nuevo">Crear Carrito</button>`;

                    let $crearCarritoNuevo = document.getElementById("crear-carrito-nuevo");
                    $crearCarritoNuevo.addEventListener("click", (e)=>{
                        fetch(`http://localhost:8080/api/carrito/`, {
                            method: "POST"
                        }).then(data=>data.json()).finally(()=>{
                            window.location.href = `http://localhost:8080/`
                        });
                    })
                    return false;
                }
            });
        }
    } else if (url == "/api/productos") {
        if (id) {
            fetch(`http://localhost:8080${url}/${id}`).then(res => res.json()).then((data) => {
                let contenido = "";
                let producto = data.producto;

                contenido += `
                    <article class="producto">
                        <img class="foto" src="${producto.foto}"/>
                        <span class="precio">${producto.precio} $</span>
                        <div class="contenido">
                            <h3>${producto.nombre}</h3>
                            <p>${producto.descripcion}</p>
                            <button class="agregar-al-carro" id="${producto.id}">Agregar Producto</button>
                            <span>Stock: ${producto.stock}</span>                                
                        </div>
                    </article>
                `


                document.querySelector(".seccion").innerHTML = contenido;
                let aside = document.querySelector(".formulario");
                aside.innerHTML = ``;
                let $botonAgregarCarro = document.querySelector(".agregar-al-carro");

                $botonAgregarCarro.addEventListener("click", (e) => {
                    let ide = e.target.id;
                    fetch(`http://localhost:8080/api/carrito/${idC}/productos/${ide}`, {
                        method: 'POST'
                    }).then(data => data.json()).finally(() => {
                        window.location.href = `http://localhost:8080/`
                    });
                })
            })
        } else {
            fetch(`http://localhost:8080${url}/`).then(res => res.json()).then((data) => {
                let contenido = "";
                let productos = data.productos;
                let usuario = data.usuario.admin;
                if (usuario) {
                    for (let item of productos) {
                        contenido += `
                            <article class="producto">
                                <img class="foto" src="${item.foto}"/>
                                <span class="precio">${item.precio} $</span>
                                <span class="stock-img">Stock: ${item.stock}</span>
                                <div class="contenido">
                                    <h3>${item.nombre}</h3>
                                    <p>${item.descripcion}</p>
                                    <button class="agregar-al-carro" id="${item.id}">Agregar Producto</button>
                                    <div class="botones-contenido">
                                        <button class="botonProductos" id="${item.id}">Ver Producto</button>
                                        <button class="eliminarProducto" id="${item.id}">Eliminar</button>
                                        <button class="editarProducto" id="${item.id}">Actualizar</button>
                                    </div>
                                </div>
                            </article>
                        `
                    }

                    document.querySelector(".seccion").innerHTML = contenido;
                    let $borrarProducto = document.querySelectorAll(".eliminarProducto");
                    $borrarProducto.forEach((elem) => {
                        elem.addEventListener("click", (e) => {
                            let id = e.target.id;
                            fetch(`http://localhost:8080${url}/${id}`, {
                                method: 'DELETE'
                            }).then(data => data.json()).finally(() => {
                                window.location.href = "http://localhost:8080/"
                            });

                        })
                    })
                    let $botonAgregarCarro = document.querySelectorAll(".agregar-al-carro");

                    $botonAgregarCarro.forEach(elem => {
                        elem.addEventListener("click", (e) => {
                            let ide = e.target.id;
                            fetch(`http://localhost:8080/api/carrito/${idC}/productos/${ide}`, {
                                method: 'POST'
                            }).then(data => data.json()).finally(() => {
                                window.location.href = "http://localhost:8080/"
                            });
                        })
                    })
                   

                    //formulario
                    let aside = document.querySelector(".formulario");
                    aside.innerHTML = `
                        <h2>Ingresar Producto</h2>
                        <form id="ingresoProducto">
                            <input type="text" placeholder="Nombre" name="nombre" id="nombre" required/>           
                            <input type="text" placeholder="Descripción" name="descripcion" id="descripcion" required/>
                            <input type="url" placeholder="Foto" name="foto" id="foto" required/>
                            <input type="number" placeholder="Precio" name="precio" id="precio" required/>
                            <input type="number" placeholder="Stock" name="stock" id="stock" required/>
                            <input type="submit" id="enviar-producto" vlaue="Guardar Producto" />
                        </form>  
                        <h2>Editar Productos</h2>
                        <form id="editarUnProducto">
                            <input type="text" placeholder="Id del Producto" name="id" id="idProducto" required/>           
                            <input type="text" placeholder="Nombre" name="nombre" id="nombreEdit" />           
                            <input type="text" placeholder="Descripción" name="descripcion" id="descripcionEdit" />
                            <input type="url" placeholder="Foto" name="foto" id="fotoEdit" />
                            <input type="number" placeholder="Precio" name="precio" id="precioEdit" />
                            <input type="number" placeholder="Stock" name="stock" id="stockEdit" />
                            <input type="submit" id="enviar-producto" vlaue="Editar Producto" />
                        </form>        
                    `;

                    
                    let $form = document.getElementById("ingresoProducto");
                    $form.addEventListener("submit",(e)=>{
                        
                        let $nombre = document.getElementById("nombre").value;
                        let $descripcion = document.getElementById("descripcion").value;
                        let $foto = document.getElementById("foto").value;
                        let $precio = document.getElementById("precio").value;
                        let $stock = document.getElementById("stock").value;
                        e.preventDefault();
                        fetch(`http://localhost:8080/api/productos`,{
                            method: 'POST',
                            mode:"cors",
                            headers:{
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                nombre: $nombre,
                                descripcion: $descripcion,
                                foto: $foto,
                                precio: Number.parseInt($precio),
                                stock:Number.parseInt($stock)
                            })
                        }).then(data => data.json()).then((dat) => console.log(dat)).finally(()=>{
                            window.location.href = "http://localhost:8080/"
                        })    
                    })
                    const $editarProductos = document.querySelectorAll(".editarProducto");

                    $editarProductos.forEach(el => {
                        el.addEventListener("click", (e)=>{
                            let $idEdit = document.getElementById("idProducto");
                            let idEl = e.target.id;
                            $idEdit.value = idEl;
                            $idEdit.focus();
                            
                        })
                    })

                    let $formEdit = document.getElementById("editarUnProducto");
                    $formEdit.addEventListener("submit",(e)=>{
                        
                        let $idEdited = document.getElementById("idProducto").value;
                        let $nombreEdit = document.getElementById("nombreEdit").value;
                        let $descripcionEdit = document.getElementById("descripcionEdit").value;
                        let $fotoEdit = document.getElementById("fotoEdit").value;
                        let $precioEdit = document.getElementById("precioEdit").value;
                        let $stockEdit = document.getElementById("stockEdit").value;
                        e.preventDefault();
                        fetch(`http://localhost:8080/api/productos/${$idEdited}`,{
                            method: 'PUT',
                            mode:"cors",
                            headers:{
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                id:$idEdited,
                                nombre: $nombreEdit,
                                descripcion: $descripcionEdit,
                                foto: $fotoEdit,
                                precio: Number.parseInt($precioEdit),
                                stock: Number.parseInt($stockEdit)
                            })
                        }).then(data => data.json()).then((dat) => console.log(dat)).finally(()=>{
                            window.location.href = "http://localhost:8080/"
                        })    
                    })



                } else {
                    for (let item of productos) {
                        contenido += `
                            <article class="producto">
                                <img class="foto" src="${item.foto}"/>
                                <span class="precio">${item.precio} $</span>
                                <div class="contenido">
                                    <h3>${item.nombre}</h3>
                                    <p>${item.descripcion}</p>
                                    <button class="agregar-al-carro" id="${item.id}">Agregar Producto</button>
                                    <span>Stock: ${item.stock}</span>
                                    <button class="botonProductos" id="${item.id}">Ver Producto</button>
                                </div>
                            </article>
                        `

                    }

                    document.querySelector(".seccion").innerHTML = contenido;
                    let aside = document.querySelector(".formulario");
                    aside.innerHTML = ``;
                    let $botonAgregarCarro = document.querySelectorAll(".agregar-al-carro");

                    $botonAgregarCarro.forEach(elem => {
                        elem.addEventListener("click", (e) => {
                            let ide = e.target.id;
                            fetch(`http://localhost:8080/api/carrito/${idC}/productos/${ide}`, {
                                method: 'POST'
                            }).then(data => data.json()).finally(() => {
                                window.location.href = "http://localhost:8080/"
                            });
                        })
                    })
                }
                let $botonesProductos = document.querySelectorAll(".botonProductos");
                $botonesProductos.forEach((elem) => {
                    elem.addEventListener("click", (e) => {
                        let id = e.target.id;
                        cambioFetch("/api/productos", id)

                    })

                })
            })

        }

    }


};


window.addEventListener("DOMContentLoaded", () => {
    cambioFetch("/api/productos",false,numidCarrito);
    $botonProductos.addEventListener("click", () => {
        cambioFetch("/api/productos", false, numidCarrito);
    });


    $botonCarrito.addEventListener("click", () => {
        cambioFetch("/api/carrito", false ,numidCarrito);            
    });


})