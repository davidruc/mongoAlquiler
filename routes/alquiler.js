import { Router } from "express";
import { configGET } from "../middleware/limit.js";
import { appMiddlewareAlquilerVerify, appDTOData, appDTOParam } from "../middleware/alquiler.js";
import { conexion } from "../db/atlas.js";
const appAlquiler = Router();

let db = await conexion();
let alquiler = db.collection("alquiler");

appAlquiler.get("/:id?", configGET(),appMiddlewareAlquilerVerify,appDTOData,appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    let result = (!req.params.id)     
    ? await alquiler.find({}).toArray()
    : await alquiler.find({ "ID_alquiler": parseInt(req.params.id)}).toArray();
    res.send(result);
})
appAlquiler.post("/", configGET(), appMiddlewareAlquilerVerify, appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    try{
        let result = await alquiler.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        res.status(422).send(error)
    }
});
appAlquiler.put("/:id?", configGET(), appMiddlewareAlquilerVerify, appDTOParam ,  appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del alquiler que deseas modificar."})
    }else{
        try{
            let result = await alquiler.updateOne(
                { "ID_alquiler": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
appAlquiler.delete("/:id?", configGET(), appMiddlewareAlquilerVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del alquiler que deseas eliminar."})
    } else {
        try{
            let result = await alquiler.deleteOne(
                { "ID_alquiler": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
})

export default appAlquiler;