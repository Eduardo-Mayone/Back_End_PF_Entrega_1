import { Router } from "express";

const cartRouter = Router();

cartRouter.get("/", (req,res) => {
    res.send("estoy en cart route")

})
cartRouter.post("/", (req,res) => {
     
})

cartRouter.get("/:cid", (req,res) => {
    res.send("estoy en cart route")

})

cartRouter.post("/:cid/product/:pid", (req,res) => {
     
})





export default cartRouter