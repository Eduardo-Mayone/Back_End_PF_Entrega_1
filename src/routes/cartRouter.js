import { Router } from "express";
import cartManager from "../cartManager.js";
import CartManager from "../cartManager.js";
const cartRouter = Router();
const carritos = new CartManager("./src/Carrito.json")
// cartRouter.get("/", (req,res) => {
//     res.send("estoy en cart route")

// })

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


// cartRouter.get("/:cid", (req,res) => {


// })

cartRouter.post("/:cid/product/:pid", async (req,res) => {
    try{
        await carritos.addProductAlCarrito(req.params.cid, req.params.pid)
        res.status(200).send("Producto agregado al carrito")
    } catch (e){
        console.log(e)
    }
     
})





export default cartRouter