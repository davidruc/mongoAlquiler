import { Router } from "express";
import { configGET } from "../middleware/limit.js";
import { appMiddlewareAutomovilVerify, appDTOData, appDTOParam } from "../middleware/automovil.js";
import { conexion } from "../db/atlas.js";
const appAutomovil = Router();

let db = await conexion();
let automovil = db.collection("automovil");

appAutomovil.get("/:id?", configGET(),appMiddlewareAutomovilVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    let result = (!req.params.id)     
    ? await automovil.find({}).toArray()
    : await automovil.find({ "ID_Automovil": parseInt(req.params.id)}).toArray();
    res.send(result);
})
appAutomovil.post("/", configGET(), appMiddlewareAutomovilVerify, appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    try{
        let result = await automovil.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        res.status(422).send(error)
    }
});
appAutomovil.put("/:id?", configGET(), appMiddlewareAutomovilVerify, appDTOParam ,  appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del automovil que deseas modificar."})
    }else{
        try{
            let result = await automovil.updateOne(
                { "ID_Automovil": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
appAutomovil.delete("/:id?", configGET(), appMiddlewareAutomovilVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del automovil que deseas eliminar."})
    } else {
        try{
            let result = await automovil.deleteOne(
                { "ID_Automovil": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
})

export default appAutomovil;