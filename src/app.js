import express from "express"
import ProductManager from "./productManager.js"
//import CartManager from "./cartManager.js"

import productsRouter from "./routes/productsRouter.js"
import cartRouter from "./routes/cartRouter.js"

const port = 8080;
const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//Routes
app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)

app.listen(port, () => console.log(`Servidor escuchando en ${port}`))