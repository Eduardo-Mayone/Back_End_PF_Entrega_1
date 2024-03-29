import { Router } from "express";
import ProductManager from "../productManager.js"

let productos = new ProductManager("./src/Productos.json")
const productsRouter = Router();
const error_id = {error: "No existe producto con ese ID"}
const error_limit = {error: "Valor no valido de limit"}

productsRouter.get("/", async(req, res)=> {
    try{
        let productos_obtenidos
        let cantidad = parseInt(req.query.limit)
        if (cantidad != cantidad) { // o sea is NaN y no colocó limit o limit valido
            productos_obtenidos = await productos.getProducts()
            res.send(productos_obtenidos)
            //console.log("estos son los todos los productos sin limite válido", productos_obtenidos)
        } else {
            console.log("este es el limite", cantidad)
            productos_obtenidos = await productos.getProducts()
            if (cantidad == 0 || cantidad >= productos_obtenidos.length) {
                //console.log("El límite es 0 o mayor que los productos posibles")
                res.send(error_limit)
            } else {
                let productos_limitados = (await productos.getProducts()).slice(0,cantidad)
                res.send(productos_limitados)
            }
        }    
    } catch(e){
        console.log(e)
    }
         
})
productsRouter.get("/:pid", async(req, res)=> {
    try{
        
        let producto_por_id = await productos.getProductById(parseInt(req.params.pid))
        res.send(producto_por_id)
        //console.log("este es el producto por id", producto_por_id)
    } catch(e){
        console.log(e)
        res.send(error_id)
    }        
})

productsRouter.post("/", async (req,res) => {
    try{
        let nuevo_producto = req.body
    
        if (nuevo_producto) {
            await productos.addProduct(nuevo_producto)
            res.status(200).send("producto agregado")
        }
    } catch(e){
        console.log(e)
    }



})

productsRouter.put("/:pid", async (req,res) => {
    try{
        const producto_a_actualizar = req.body 
        producto_a_actualizar.id = parseInt(req.params.pid)
        const producto_buscado = await productos.updateProduct(producto_a_actualizar)
        if (producto_buscado) {
            res.status(200).send("Producto actualizado correctamente")
        }
    } catch(e){
        console.log(e)
    }

})

// es correcto lo que estoy haciendo, estoy definiendo async para poder usar await
// y esto está llamando a la función deleteProduct que es asíncrona

productsRouter.delete("/:pid", async (req,res) => { 
    try{
        const id = parseInt(req.params.pid)

        if (await productos.deleteProduct(id)) {
            res.status(200).send("Producto borrado correctamente")
        } else {
            res.status(501).send("Producto no encontrado")
        }    
       
    } catch(e){
        console.log(e)
    }    

})

export default productsRouter;