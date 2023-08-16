import { Router } from "express";
import { configGET } from "../middleware/limit.js";
import { appMiddlewareSucursalxAutoVerify, appDTOData, appDTOParam } from "../middleware/sucursal_auto.js";
import { conexion } from "../db/atlas.js";
const appSucursalxAuto = Router();

let db = await conexion();
let sucursal_Auto = db.collection("sucursal_automovil");

const getSucursalesById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await sucursal_Auto.aggregate([
            { $match: { "ID_Sucursal_id": parseInt(id)}},
            {
                $project: {
                 "_id": 0,
                 "id_sucursal": "$ID_Sucursal_id",
                 "id_auto": "$ID_Automovil_id",
                 "cantidad_disponible": "$Cantidad_Disponible",
                }
            }
        ]).toArray();
        resolve(result);
    })
};
const getAllSucursales = ()=>{
    return new Promise(async(resolve)=>{
        let result = await sucursal_Auto.aggregate([
            {
                $project: {
                    "_id": 0,
                    "id_sucursal": "$ID_Sucursal_id",
                    "id_auto": "$ID_Automovil_id",
                    "cantidad_disponible": "$Cantidad_Disponible"
                }
            }
        ]).toArray();
        resolve(result);
    })
};
appSucursalxAuto.get("/", configGET(),appMiddlewareSucursalxAutoVerify, async(req, res)=>{
    if(!req.rateLimit) return;
    try{
        const {id} = req.query;
        if(id){
            const data = await getSucursalesById(id);
            res.send(data);
        } else {
            const data = await getAllSucursales();
            res.send(data);
        }
    }
    catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});

appSucursalxAuto.get("/totalAutos", configGET(),appMiddlewareSucursalxAutoVerify, async(req, res)=>{
    if(!req.rateLimit) return;
    let result = await sucursal_Auto.aggregate([
        {
            $lookup: {
              from: "sucursal",
              localField: "ID_Sucursal_id",
              foreignField: "ID_Sucursal",
              as: "Total"
            }
        },
        
        {$unwind: "$Total" },
        {
            $group: {
              _id: "$Total.ID_Sucursal",
              sucursal: {$first: "$Total.Nombre"},
              totalAutos: {
                $sum: "$Cantidad_Disponible"
              }
            }
        },
    ]).toArray();
    res.send(result);
});

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