import "./utilities/firebase"
import { subirProducto, tiempoRealProductos, traerProductos } from "./utilities/firebase"

class AppContainer extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }

    connectedCallback() {
        this.mount()

    }

    mount() {
        this.render()

    }

    render() {
        if (this.shadowRoot) {
            const linkCSS = this.ownerDocument.createElement("link")
            linkCSS.setAttribute("rel", "stylesheet")
            linkCSS.setAttribute("href", "/src/index.css")
            this.shadowRoot.appendChild(linkCSS)

            const mainContainer = this.ownerDocument.createElement("section")
            mainContainer.setAttribute("id", "mainContainerSection")
            this.shadowRoot.appendChild(mainContainer)

            const abrirSubirProductoButton = this.ownerDocument.createElement("button")
            abrirSubirProductoButton.innerHTML = "Subir un Producto"
            abrirSubirProductoButton.id = "prueba"
            mainContainer.appendChild(abrirSubirProductoButton)

            const contenedorFormulario = this.ownerDocument.createElement("div")
            contenedorFormulario.id = "contenedorFormulario"
            contenedorFormulario.classList.add("oculto")
            mainContainer.appendChild(contenedorFormulario)

            const contenedorProductos = this.ownerDocument.createElement("div")
            contenedorProductos.id = "contenedorProductos"
            mainContainer.appendChild(contenedorProductos)

            const xButton = this.ownerDocument.createElement("button")
            xButton.innerText = "Platos"
            contenedorFormulario.appendChild(xButton)

            const inputNombre = this.ownerDocument.createElement("input")
            inputNombre.setAttribute("type", "text")
            inputNombre.setAttribute("placeholder", "Ingrese el nombre del producto")
            contenedorFormulario.appendChild(inputNombre)

            const inputDesc = this.ownerDocument.createElement("input")
            inputDesc.setAttribute("type", "text")
            inputDesc.setAttribute("placeholder", "Ingrese la descripcion del producto")
            contenedorFormulario.appendChild(inputDesc)

            const inputPrecio = this.ownerDocument.createElement("input")
            inputPrecio.setAttribute("type", "text")
            inputPrecio.setAttribute("placeholder", "Ingrese el precio del producto")
            contenedorFormulario.appendChild(inputPrecio)

            const inputCant = this.ownerDocument.createElement("input")
            inputCant.setAttribute("type", "text")
            inputCant.setAttribute("placeholder", "Ingrese la cantidad del producto")
            contenedorFormulario.appendChild(inputCant)

            const inputImagen = this.ownerDocument.createElement("input")
            inputImagen.setAttribute("type", "file")
            inputImagen.setAttribute("placeholder", "Suba la imagen del producto")
            contenedorFormulario.appendChild(inputImagen)

            const buttonSubirProducto = this.ownerDocument.createElement("button")
            buttonSubirProducto.innerText = "SUBIR"
            contenedorFormulario.appendChild(buttonSubirProducto)

            tiempoRealProductos(contenedorProductos)

            abrirSubirProductoButton.addEventListener("click", () => {
                if (contenedorFormulario.classList.contains("oculto")) {
                    contenedorFormulario.classList.remove("oculto")
                    contenedorFormulario.classList.add("contenedorFormulario")
                } else {
                    this.cerrarModalSubir(contenedorFormulario)
                }
            })

            xButton.addEventListener("click", () => {
                this.cerrarModalSubir(contenedorFormulario)
            })

            buttonSubirProducto.addEventListener("click", () => {
                subirProducto(inputNombre.value, inputDesc.value, inputPrecio.value, inputCant.value, inputImagen.files![0])
                this.cerrarModalSubir(contenedorFormulario)
            })
        }
    }

    cerrarModalSubir(modal: HTMLElement) {
        modal.classList.remove("contenedorFormulario")
        modal.classList.add("oculto")
    }
}

customElements.define("app-container", AppContainer)