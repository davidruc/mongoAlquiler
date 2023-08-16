import { Router } from "express";
import { configGET } from "../middleware/limit.js";
import { appMiddlewareDevolucionVerify, appDTOData, appDTOParam } from "../middleware/registro_devolucion.js";
import { conexion } from "../db/atlas.js";
const appDevoluciones = Router();

let db = await conexion();
let registro_devolucion = db.collection("registro_devolucion");

appDevoluciones.get("/:id?", configGET(),appMiddlewareDevolucionVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    let result = (!req.params.id)     
    ? await registro_devolucion.find({}).toArray()
    : await registro_devolucion.find({ "ID_Registro": parseInt(req.params.id)}).toArray();
    res.send(result);
})
appDevoluciones.post("/", configGET(), appMiddlewareDevolucionVerify, appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    try{
        let result = await registro_devolucion.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        res.status(422).send(error)
    }
});
appDevoluciones.put("/:id?", configGET(), appMiddlewareDevolucionVerify, appDTOParam ,  appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del registro_devolucion que deseas modificar."})
    }else{
        try{
            let result = await registro_devolucion.updateOne(
                { "ID_Registro": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
appDevoluciones.delete("/:id?", configGET(), appMiddlewareDevolucionVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del registro_devolucion que deseas eliminar."})
    } else {
        try{
            let result = await registro_devolucion.deleteOne(
                { "ID_Registro": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
})

export default appDevoluciones;