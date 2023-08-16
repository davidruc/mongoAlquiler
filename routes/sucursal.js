import { Router } from "express";
import { configGET } from "../middleware/limit.js";
import { appMiddlewareSucursalVerify, appDTOData, appDTOParam } from "../middleware/sucursales.js";
import { conexion } from "../db/atlas.js";
const appSucursal = Router();

let db = await conexion();
let sucursal = db.collection("sucursal");

const getSucursalesById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await sucursal.aggregate([
            { $match: { "ID_Sucursal": parseInt(id)}},
            {
                $project: {
                 "_id": 0,
                 "id_sucursal": "$ID_Sucursal",
                 "sucursal":"$Nombre",
                 "ubicacion":"$Direccion",
                 "contacto":"$Telefono"
                }
            }
        ]).toArray();
        resolve(result);
    })
};
const getAllSucursales = ()=>{
    return new Promise(async(resolve)=>{
        let result = await sucursal.aggregate([
            {
                $project: {
                    "_id": 0,
                    "id_sucursal": "$ID_Sucursal",
                    "sucursal":"$Nombre",
                    "ubicacion":"$Direccion",
                    "contacto":"$Telefono"
                }
            }
        ]).toArray();
        resolve(result);
    })
};
appSucursal.get("/", configGET(),appMiddlewareSucursalVerify, async(req, res)=>{
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

appSucursal.get("/cantidadTotal", configGET(),appMiddlewareSucursalVerify, async(req, res)=>{
    if(!req.rateLimit) return;
    let result = await sucursal.aggregate([
        {
            $lookup: {
              from: "sucursal_automovil",
              localField: "ID_Sucursal",
              foreignField: "ID_Sucursal_id",
              as: "autos"
            }
        },
        {$unwind : "$autos"},
        {
            $group: {
              _id: "$Nombre",
              direccion: {$first: "$Direccion"},
              CantidadAutos: {
                $sum: "$autos.Cantidad_Disponible"
              }
            }
        },
        {
            $project: {
              "_id": 0,
              "sucursal": "$_id",
              "direccion": "$direccion",
              "cantidad_automoviles": "$CantidadAutos"
            }
        }
    ]).toArray();
    res.send(result);
});


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