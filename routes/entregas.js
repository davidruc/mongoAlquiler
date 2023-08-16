import { Router } from "express";
import { configGET } from "../middleware/limit.js";
import { appMiddlewareEntregasVerify, appDTOData, appDTOParam } from "../middleware/registro_entregas.js";
import { conexion } from "../db/atlas.js";
const appEntregas = Router();

let db = await conexion();
let entregas = db.collection("registro_entrega");

appEntregas.get("/:id?", configGET(),appMiddlewareEntregasVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    let result = (!req.params.id)     
    ? await entregas.find({}).toArray()
    : await entregas.find({ "ID_Registro": parseInt(req.params.id)}).toArray();
    res.send(result);
})
appEntregas.post("/", configGET(), appMiddlewareEntregasVerify, appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    try{
        let result = await entregas.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        res.status(422).send(error)
    }
});
appEntregas.put("/:id?", configGET(), appMiddlewareEntregasVerify, appDTOParam ,  appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del entregas que deseas modificar."})
    }else{
        try{
            let result = await entregas.updateOne(
                { "ID_Registro": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
appEntregas.delete("/:id?", configGET(), appMiddlewareEntregasVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del entregas que deseas eliminar."})
    } else {
        try{
            let result = await entregas.deleteOne(
                { "ID_Registro": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
})

export default appEntregas;