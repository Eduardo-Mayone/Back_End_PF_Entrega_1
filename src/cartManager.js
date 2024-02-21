import fs from "fs"
import { randomUUID } from "crypto"

export default class CartManager {

    constructor(path) {
        this.path = path;
        console.log("Este es el path: ", this.path)
        
    }

    async getCarritos() {

        const data = await fs.promises.readFile(this.path, 'utf-8');
        const carritos = JSON.parse(data);
        return carritos
    }

    async generarCarrito() {
        const index = randomUUID();
        const carritos = await this.getCarritos();
        if (carritos) {
            const nuevoCarrito = { }
            nuevoCarrito.id_carrito = index
            nuevoCarrito.productos_agregados = []
            carritos.push(nuevoCarrito)          
        } else {
            carritos = []
            const nuevoCarrito = { }
            nuevoCarrito.id_carrito = index
            nuevoCarrito.productos_agregados = []
            carritos.push(nuevoCarrito)   
        }
        await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, "\t"));
    }
    
    async addProductAlCarrito(id_carrito,id_producto) {
        const carritos = await this.getCarritos();
        const indice = carritos.findIndex((carro)=> carro.id_carrito == id_carrito)
        
        if (indice != -1) {
            const posicion = carritos[indice].productos_agregados.findIndex ((producto) => producto.id_producto == id_producto)
            if (posicion != -1) {
                carritos[indice].productos_agregados[posicion].quantity += 1
            }else {
                const producto_a_agregar = {}
                producto_a_agregar.id_producto = id_producto
                producto_a_agregar.quantity = 1
                carritos[indice].productos_agregados.push(producto_a_agregar)
            }
            console.log("Producto agregado: ", carritos)
            await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, "\t"));
        } else {
            console.log("Carrito no existe")
        }
    }

    async getCarritoById(id) {
        const carritos = await this.getCarritos();
        const carrito_buscado = carritos.find ((carrito) => carrito.id === id);
        if (!carrito_buscado) {
            console.log ("Product NOT FOUND");
        }
        else {
            console.log("Carrito buscado por id: ", carrito_buscado);
            return carrito_buscado;  
        }
    }

}