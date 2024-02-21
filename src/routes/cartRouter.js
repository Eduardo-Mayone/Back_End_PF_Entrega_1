import { Router } from "express";
import CartManager from "../cartManager.js";
const cartRouter = Router();
const carritos = new CartManager("./src/Carrito.json")

// crea carrito recibe body vacío
cartRouter.post("/", async (req,res) => {
    try{
       if (Object.keys(req.body).length === 0) {
          await carritos.generarCarrito()
          res.status(200).send("Carrito creado correctamente")
       } else {
        res.status(400).send("Carrito NO creado")
       }
    } catch (e) {
        console.log(e)
    } 
})


cartRouter.get("/:cid", async (req,res) => {
    try{
        
        let carrito_por_id = await carritos.getCarritoById(req.params.pid)
        res.status(200).send(carrito_por_id)
        console.log("este es el carrito por id", carrito_por_id)
    } catch(e){
        console.log(e)
        res.send(error_id)
    }   

})

cartRouter.post("/:cid/product/:pid", async (req,res) => {
    try{
        await carritos.addProductAlCarrito(req.params.cid, req.params.pid)
        res.status(200).send("Producto agregado al carrito")
    } catch (e){
        console.log(e)
    }
     
})

export default cartRouter