import { Router } from "express";
import { configGET } from "../middleware/limit.js";
import expressQueryBoolean from 'express-query-boolean';
import { appMiddlewareAutomovilVerify, appDTOData, appDTOParam } from "../middleware/automovil.js";
import { conexion } from "../db/atlas.js";
const appAutomovil = Router();

let db = await conexion();
let automovil = db.collection("automovil");

appAutomovil.use(expressQueryBoolean());

const getAutomovilById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await automovil.aggregate([
            { $match: { "ID_Automovil": parseInt(id)}},
            {
                $project: {
                  "_id": 0,
                  "id_auto": "$ID_Automovil",
                  "marca_auto": "$Marca",
                  "modelo_auto": "$Modelo",
                  "año_auto": "$Anio",
                  "tipo_auto": "$Tipo",
                  "capacidad_auto": "$Capacidad",
                  "costo_dia": "$Precio_Diario",
                }
            }
        ]).toArray();
        resolve(result);
    })
};
const getAllAutos = ()=>{
    return new Promise(async(resolve)=>{
        let result = await automovil.aggregate([
            {
                $project: {
                  "_id": 0,
                  "id_auto": "$ID_Automovil",
                  "marca_auto": "$Marca",
                  "modelo_auto": "$Modelo",
                  "año_auto": "$Anio",
                  "tipo_auto": "$Tipo",
                  "capacidad_auto": "$Capacidad",
                  "costo_dia": "$Precio_Diario",
                }
            }
        ]).toArray();
        resolve(result);
    })
};
appAutomovil.get("/", configGET(),appMiddlewareAutomovilVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    try{
        const {id} = req.query;
        if(id){
            const data = await getAutomovilById(id);
            res.send(data);
        } else {
            const data = await getAllAutos();
            res.send(data);
        }
    }
    catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});
appAutomovil.get("/capacidad_grande", configGET(), appMiddlewareAutomovilVerify , async(req, res)=>{
    if(!req.rateLimit) return;
    let result = await automovil.aggregate([
        {
            $match: {"Capacidad": {$gt :5}}
        },
        {
            $project: {
              "_id": 0,
              "id_auto": "$ID_Automovil",
              "marca_auto": "$Marca",
              "modelo_auto": "$Modelo",
              "año_auto": "$Anio",
              "tipo_auto": "$Tipo",
              "capacidad_auto": "$Capacidad",
              "costo_dia": "$Precio_Diario",
            }
        }
    ]).toArray();
    res.send(result);
});
appAutomovil.get("/autos_por_marca", configGET(), appMiddlewareAutomovilVerify , async(req, res)=>{
    if(!req.rateLimit) return;
    let result = await automovil.aggregate([
        { $match: { Tipo: "Automovil" } }, 
        {
            $project: {
                "_id": 0,
                "id_auto": "$ID_Automovil" ,
                "Marca": "$Marca",
                "modelo_auto": "$Modelo",
                "año_modelo": "$Anio",
                "tipo_automovil": "$Tipo",
                "capacidad_auto": "$Capacidad",
                "precio_dia": "$Precio_Diario"
            }
        },
        {
            $group: {
              _id: "$Marca",
              automoviles: {
              $push: "$$ROOT"
              }
            }
        },
        {
            $project: {
                "_id": 0,
                "marca_auto": "$_id",
                "automoviles": "$automoviles",
                
            }
        }
    ]).toArray();
    res.send(result);
});
appAutomovil.get("/autos_grandes_disponibles", configGET(), appMiddlewareAutomovilVerify , async(req, res)=>{
    if(!req.rateLimit) return;
    let result = await automovil.aggregate([
        {
            $match: {
                "Capacidad": {$gt :5}
            }
        },
       
        {
            $lookup: {
              from: "sucursal_automovil",
              localField: "ID_Automovil",
              foreignField: "ID_Automovil_id",
              pipeline: [
                {
                    $project: {
                        "_id": 0,
                        "unidades_disponibles": "$Cantidad_Disponible" 
                    }
                }
              ],
              as: "detalles"
            }
        }, {
            $unwind: "$detalles"
        }, {
            $project: {
                "_id": 0,
                "id_auto": "$ID_Automovil" ,
                "Marca": "$Marca",
                "modelo_auto": "$Modelo",
                "año_modelo": "$Anio",
                "tipo_automovil": "$Tipo",
                "capacidad_auto": "$Capacidad",
                "precio_dia": "$Precio_Diario",
                "Disponibilidad": "$detalles"
            }
        }
    ]).toArray();
    res.send(result);
});

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