import { Router } from "express";
import { configGET } from "../middleware/limit.js";
import { appMiddlewareSucursalxAutoVerify, appDTOData, appDTOParam } from "../middleware/sucursal_auto.js";
import { conexion } from "../db/atlas.js";
const appSucursalxAuto = Router();

let db = await conexion();
let sucursal_Auto = db.collection("sucursal_automovil");

appSucursalxAuto.get("/:id?", configGET(),appMiddlewareSucursalxAutoVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    let result = (!req.params.id)     
    ? await sucursal_Auto.find({}).toArray()
    : await sucursal_Auto.find({ "ID_Sucursal_id": parseInt(req.params.id)}).toArray();
    res.send(result);
})
appSucursalxAuto.post("/", configGET(), appMiddlewareSucursalxAutoVerify, appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    try{
        let result = await sucursal_Auto.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        res.status(422).send(error)
    }
});
appSucursalxAuto.put("/:id?", configGET(), appMiddlewareSucursalxAutoVerify, appDTOParam ,  appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del sucursal_Auto que deseas modificar."})
    }else{
        try{
            let result = await sucursal_Auto.updateOne(
                { "ID_Sucursal_id": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
appSucursalxAuto.delete("/:id?", configGET(), appMiddlewareSucursalxAutoVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del sucursal_Auto que deseas eliminar."})
    } else {
        try{
            let result = await sucursal_Auto.deleteOne(
                { "ID_Sucursal_id": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
})

export default appSucursalxAuto;