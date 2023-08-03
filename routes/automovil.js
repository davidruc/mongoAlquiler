import { Router } from "express";
import { configGET } from "../middleware/limit.js";
import bodyParser from "body-parser";

const appAutomovil = Router();

appAutomovil.get("/", configGET(), bodyParser.json({limit: '151B'
}) ,(req, res)=>{
    console.log(req.body);
    console.log(req.rateLimit);
    res.send("hola mundo");
})

export default appAutomovil;