import { Router } from "express";
import { configGET } from "../middleware/limit.js";
import { appMiddlewareReservaVerify, appDTOData, appDTOParam } from "../middleware/reservas.js";
import { conexion } from "../db/atlas.js";
const appReservas = Router();

let db = await conexion();
let reservas = db.collection("reserva");

appReservas.get("/:id?", configGET(),appMiddlewareReservaVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    let result = (!req.params.id)     
    ? await reservas.find({}).toArray()
    : await reservas.find({ "ID_Reserva": parseInt(req.params.id)}).toArray();
    res.send(result);
})
appReservas.post("/", configGET(), appMiddlewareReservaVerify, appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    try{
        let result = await reservas.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        res.status(422).send(error)
    }
});
appReservas.put("/:id?", configGET(), appMiddlewareReservaVerify, appDTOParam ,  appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del reservas que deseas modificar."})
    }else{
        try{
            let result = await reservas.updateOne(
                { "ID_Reserva": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
appReservas.delete("/:id?", configGET(), appMiddlewareReservaVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del reservas que deseas eliminar."})
    } else {
        try{
            let result = await reservas.deleteOne(
                { "ID_Reserva": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
})

export default appReservas;