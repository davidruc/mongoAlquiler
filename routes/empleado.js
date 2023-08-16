import { Router } from "express";
import { configGET } from "../middleware/limit.js";
import { appMiddlewareEmpleadoVerify, appDTOData, appDTOParam } from "../middleware/empleado.js";
import { conexion } from "../db/atlas.js";
const appEmpleado = Router();

let db = await conexion();
let empleado = db.collection("empleado");


const getEmpleadoById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await empleado.aggregate([
            { $match: { "ID_Empleado": parseInt(id)}},
            {
                $project: {
                  "_id": 0,
                  "id_empleado": "$ID_Empleado",
                  "nombre_empleado": "$Nombre",
                  "documento_identidad": "$DNI",
                  "direccion_residencia": "$Direccion",
                  "numero_contacto": "$Telefono",
                  "cargo_empleado": "$Cargo"
                }
            }
        ]).toArray();
        resolve(result);
    })
};
const getAllEmpleados = ()=>{
    return new Promise(async(resolve)=>{
        let result = await empleado.aggregate([
            {
                $project: {
                    "_id": 0,
                    "id_empleado": "$ID_Empleado",
                    "nombre_empleado": "$Nombre",
                    "documento_identidad": "$DNI",
                    "direccion_residencia": "$Direccion",
                    "numero_contacto": "$Telefono",
                    "cargo_empleado": "$Cargo"
                }
            }
        ]).toArray();
        resolve(result);
    })
};
appEmpleado.get("/", configGET(),appMiddlewareEmpleadoVerify, async(req, res)=>{
    if(!req.rateLimit) return;
    try{
        const {id} = req.query;
        if(id){
            const data = await getEmpleadoById(id);
            res.send(data);
        } else {
            const data = await getAllEmpleados();
            res.send(data);
        }
    }
    catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});

appEmpleado.get("/vendedor", configGET(),appMiddlewareEmpleadoVerify, async(req, res)=>{
    if(!req.rateLimit) return;
    let result = await empleado.aggregate([
        {
            $match: {
              "Cargo": "Agente de Entrega"
            }
        },
        {
            $project: {
                "_id": 0,
                "id_empleado": "$ID_Empleado",
                "nombre_empleado": "$Nombre",
                "documento_identidad": "$DNI",
                "direccion_residencia": "$Direccion",
                "numero_contacto": "$Telefono",
                "cargo_empleado": "$Cargo"
            }
        }
    ]).toArray();
    res.send(result);
});

appEmpleado.get("/gerente_asistente", configGET(),appMiddlewareEmpleadoVerify, async(req, res)=>{
    if(!req.rateLimit) return;
    let result = await empleado.aggregate([
        {
            $match: {
                $or: [{Cargo: "Gerente"}, {Cargo: "Asistente"}]
            }
        },
        {
            $project: {
                "_id": 0,
                "id_empleado": "$ID_Empleado",
                "nombre_empleado": "$Nombre",
                "documento_identidad": "$DNI",
                "direccion_residencia": "$Direccion",
                "numero_contacto": "$Telefono",
                "cargo_empleado": "$Cargo"
            }
        }
    ]).toArray();
    res.send(result);
});

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