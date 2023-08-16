import { Router } from "express";
import { configGET } from "../middleware/limit.js";
import { appMiddlewareEmpleadoVerify, appDTOData, appDTOParam } from "../middleware/empleado.js";
import { conexion } from "../db/atlas.js";
const appEmpleado = Router();

let db = await conexion();
let empleado = db.collection("empleado");

appEmpleado.get("/:id?", configGET(),appMiddlewareEmpleadoVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    let result = (!req.params.id)     
    ? await empleado.find({}).toArray()
    : await empleado.find({ "ID_empleado": parseInt(req.params.id)}).toArray();
    res.send(result);
})
appEmpleado.post("/", configGET(), appMiddlewareEmpleadoVerify, appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    try{
        let result = await empleado.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        res.status(422).send(error)
    }
});
appEmpleado.put("/:id?", configGET(), appMiddlewareEmpleadoVerify, appDTOParam ,  appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del empleado que deseas modificar."})
    }else{
        try{
            let result = await empleado.updateOne(
                { "ID_empleado": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
appEmpleado.delete("/:id?", configGET(), appMiddlewareEmpleadoVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del empleado que deseas eliminar."})
    } else {
        try{
            let result = await empleado.deleteOne(
                { "ID_empleado": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
})

export default appEmpleado;