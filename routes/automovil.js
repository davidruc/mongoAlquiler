import { Router } from "express";
import { configGET } from "../middleware/limit.js";
import { appMiddlewareAutomovilVerify, appDTOData } from "../middleware/automovil.js";
import { conexion } from "../db/atlas.js";
const appAutomovil = Router();

let db = await conexion();
let automovil = db.collection("automovil");

appAutomovil.get("/", configGET(),appMiddlewareAutomovilVerify, async(req, res)=>{
    if(!req.rateLimit) return;
    let result = await automovil.find({}).toArray();
    res.send(result);
})

export default appAutomovil;