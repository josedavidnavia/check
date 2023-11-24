import { traerProductos } from "./firebase"

export const crearProductos = async (contenedorProductos: HTMLElement) => {
    const listaProductos = await traerProductos()
    contenedorProductos.innerHTML = ""
    listaProductos.forEach((producto) => {
      const contenedorProductoSolo = document.createElement("div")
      contenedorProductoSolo.classList.add("contenedorProductoSolo")
      contenedorProductos.appendChild(contenedorProductoSolo)
  
      const imagenProducto = document.createElement("img")
      imagenProducto.src = producto.imagen
      contenedorProductoSolo.appendChild(imagenProducto)
  
      const tituloProducto = document.createElement("h1")
      tituloProducto.innerText = producto.name
      contenedorProductoSolo.appendChild(tituloProducto)
  
      const precioProducto = document.createElement("h2")
      precioProducto.innerText = producto.precio
      contenedorProductoSolo.appendChild(precioProducto)
  
      const cantidadProducto = document.createElement("h3")
      cantidadProducto.innerText = producto.cantidad
      contenedorProductoSolo.appendChild(cantidadProducto)
  
      const descripcionProducto = document.createElement("p")
      descripcionProducto.innerText = producto.descripcion
      contenedorProductoSolo.appendChild(descripcionProducto)
    })
  }