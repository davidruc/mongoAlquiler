import { Router } from "express";
import { configGET } from "../middleware/limit.js";

const appAutomovil = Router();

appAutomovil.get("/", configGET() ,(req, res)=>{
    console.log(req.rateLimit);
    res.send("hola mundo");
})

export default appAutomovil;