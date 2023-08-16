import { Router } from "express";
import { configGET } from "../middleware/limit.js";
import { appMiddlewareSucursalVerify, appDTOData, appDTOParam } from "../middleware/sucursales.js";
import { conexion } from "../db/atlas.js";
const appSucursal = Router();

let db = await conexion();
let sucursal = db.collection("sucursal");

appSucursal.get("/:id?", configGET(),appMiddlewareSucursalVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    let result = (!req.params.id)     
    ? await sucursal.find({}).toArray()
    : await sucursal.find({ "ID_Sucursal": parseInt(req.params.id)}).toArray();
    res.send(result);
})
appSucursal.post("/", configGET(), appMiddlewareSucursalVerify, appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    try{
        let result = await sucursal.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        res.status(422).send(error)
    }
});
appSucursal.put("/:id?", configGET(), appMiddlewareSucursalVerify, appDTOParam ,  appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del sucursal que deseas modificar."})
    }else{
        try{
            let result = await sucursal.updateOne(
                { "ID_Sucursal": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
appSucursal.delete("/:id?", configGET(), appMiddlewareSucursalVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del sucursal que deseas eliminar."})
    } else {
        try{
            let result = await sucursal.deleteOne(
                { "ID_Sucursal": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
})

export default appSucursal;