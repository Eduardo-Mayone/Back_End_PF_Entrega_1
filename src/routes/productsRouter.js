import { Router } from "express";
const productsRouter = Router();

productsRouter.get("/", (req,res) => {
    res.status(200).send("listado de productos")
    const cantidad = parseInt(req.query.limit)

})
productsRouter.get("/:pid", (req,res) => {
    res.status(200).send("listado de productos")

})

productsRouter.post("/", (req,res) => {
    res.status(200).send("listado de productos")

})

productsRouter.put("/:pid", (req,res) => {
    res.status(200).send("listado de productos")

})

productsRouter.delete("/:pid", (req,res) => {
    res.status(200).send("listado de productos")

})

export default productsRouter;