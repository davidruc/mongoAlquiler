import { Router } from "express";
import { configGET } from "../middleware/limit.js";
import { appMiddlewareAlquilerVerify, appDTOData, appDTOParam } from "../middleware/alquiler.js";
import { conexion } from "../db/atlas.js";
const appAlquiler = Router();

let db = await conexion();
let alquiler = db.collection("alquiler");

const getAlquileresById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await alquiler.aggregate([
            { $match: { "ID_Alquiler": parseInt(id)}},
            {
                $project: {
                    "_id": 0,
                    "id_alquiler": "$ID_Alquiler",
                    "inicio_alquiler": "$Fecha_Inicio",
                    "fin_alquiler": "$Fecha_Fin",
                    "costo_final": "$Costo_Total",
                    "estado_alquiler": "$Estado",
                }
            }
        ]).toArray();
        resolve(result);
    })
};
//A esta consulta hace falta meterle los datos del cliente
const getAlquileresByTotalCliente = (TotalCliente)=>{
    return new Promise(async(resolve)=>{
        let result = await alquiler.aggregate([
            {
                $project: {
                  "_id": 0,
                  "id_alquier": "$ID_Alquiler",
                  "id_cliente": "$ID_Cliente_id",
                  "costo_final": "$Costo_Total"
                }
            },
            {
                $match: {
                    "id_alquier": {$eq: parseInt(TotalCliente)}
                }
            }
        ]).toArray();
        resolve(result);
    })
};
const getAllAlquileres = ()=>{
    return new Promise(async(resolve)=>{
        let result = await alquiler.aggregate([
            {
                $project: {
                    "_id": 0,
                    "id_alquiler": "$ID_Alquiler",
                    "inicio_alquiler": "$Fecha_Inicio",
                    "fin_alquiler": "$Fecha_Fin",
                    "costo_final": "$Costo_Total",
                    "estado_alquiler": "$Estado",
                }
            }
        ]).toArray();
        resolve(result);
    })
};
appAlquiler.get("/", configGET(),appMiddlewareAlquilerVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    try{
        const {id, TotalCliente} = req.query;
        if(id){
            const data = await getAlquileresById(id);
            res.send(data);
        } else if(TotalCliente){
            const data = await getAlquileresByTotalCliente(TotalCliente);
            res.send(data);
        }
        else {
            const data = await getAllAlquileres();
            res.send(data);
        }
    }
    catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});

//Arreglar lo de las fechas no retorna nada
appAlquiler.get("/dia", configGET(), appMiddlewareAlquilerVerify , async(req, res)=>{
    if(!req.rateLimit) return;
    let result = await alquiler.aggregate([
        {
            $match: {
                "Fecha_Inicio": {$eq: "2024-02-15"}
            }
        }, {
            $project: {
                "_id": 0,
                "id_alquiler": "$ID_Alquiler",
                "inicio_alquiler": "$Fecha_Inicio",
                "fin_alquiler": "$Fecha_Fin",
                "costo_final": "$Costo_Total",
                "estado_alquiler": "$Estado",
            }
        }
    ]).toArray();
    res.send(result);
});
appAlquiler.get("/plazos", configGET(), appMiddlewareAlquilerVerify , async(req, res)=>{
    if(!req.rateLimit) return;
    let result = await alquiler.find({
        "Fecha_Inicio": {
            $gte: "2023-08-11",
            $lte: "2025-09-11"
        }
    }).toArray();
    res.send(result);
});
//

appAlquiler.get("/total", configGET(), appMiddlewareAlquilerVerify , async(req, res)=>{
    if(!req.rateLimit) return;
    let result = await alquiler.aggregate([
        {$count: 'ID_Alquiler'},
        {
            $project: {
                'Total de Alquileres' : '$ID_Alquiler'
            }
        }
    ]).toArray();
    res.send(result);
});

appAlquiler.post("/", configGET(), appMiddlewareAlquilerVerify, appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    try{
        let result = await alquiler.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        res.status(422).send(error)
    }
});
appAlquiler.put("/:id?", configGET(), appMiddlewareAlquilerVerify, appDTOParam ,  appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del alquiler que deseas modificar."})
    }else{
        try{
            let result = await alquiler.updateOne(
                { "ID_alquiler": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
appAlquiler.delete("/:id?", configGET(), appMiddlewareAlquilerVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del alquiler que deseas eliminar."})
    } else {
        try{
            let result = await alquiler.deleteOne(
                { "ID_alquiler": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
})

export default appAlquiler;