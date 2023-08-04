import { Router } from "express";
import { configGET } from "../middleware/limit.js";

const appAutomovil = Router();

appAutomovil.get("/", configGET() ,async(req, res)=>{
    console.log(req.rateLimit);
    if(!req.rateLimit) return;
    res.send("hola mundo");
})

export default appAutomovil;