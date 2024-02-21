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
            nuevoCarrito.id_Carrito = index
            nuevoCarrito.productos_agregados = []
            carritos.push(nuevoCarrito)          
        } else {
            carritos = []
            const nuevoCarrito = { }
            nuevoCarrito.id_Carrito = index
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





















    // async addProductAlCarrito(id_carrito,id_producto) {
    //     const carritos = await this.getCarritos();
    //     const carrito = carritos.find((carro)=> carro.id_carrito == id_carrito)
    //     if (carrito) {
    //         if (carrito.productos_agregados.find ((producto) => producto.id_producto == id_producto)) {
    //             posicion = carrito.productos_agregados.findIndex ((producto) => producto.id_producto == id_producto)
    //             carrito.productos_agregados[posicion].quantity += 1
    //         }else {
    //             const producto_a_agregar = {}
    //             producto_a_agregar.id_producto = id_producto
    //             producto_a_agregar.quantity = 1
    //             carrito.productos_agregados.push(producto_a_agregar)
    //         }
    //         console.log("Producto agregado: ", carrito)
    //         await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"));
    //     } else {
    //         console.log("Carrito no existe")
    //     }
    // }

    
    // async getProductById(id) {
    //     const productos = await this.getProducts();
    //     const producto_buscado = productos.find ((producto) => producto.id === id);
    //     if (!producto_buscado) {
    //         console.log ("Product NOT FOUND");
    //     }
    //     else {
    //         console.log("Producto buscado por id: ", producto_buscado);
    //         return producto_buscado;  
    //     }
    // }
}