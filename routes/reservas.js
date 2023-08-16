import { Router } from "express";
import { configGET } from "../middleware/limit.js";
import { appMiddlewareReservaVerify, appDTOData, appDTOParam } from "../middleware/reservas.js";
import { conexion } from "../db/atlas.js";
const appReservas = Router();

let db = await conexion();
let reservas = db.collection("reserva");

const getReservasById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await reservas.aggregate([
            { $match: { "": parseInt(id)}},
            {
                $project: {
                 "_id": 0,
                 
                }
            }
        ]).toArray();
        resolve(result);
    })
};
const getClientesReservasById = (idReserva)=>{
    return new Promise(async(resolve)=>{
        let result = await reservas.aggregate([{
            $match: {
                ID_Reserva: parseInt(idReserva)
            }
        },
        {
            $lookup: {
                from: "cliente",
                localField: "ID_Cliente_id",
                foreignField: "ID_Cliente",
                pipeline: [
                    {
                        $project: {
                          "_id": 0,
                          "id_cliente":"$ID_Cliente",
                          "nombre_cliente":"$Nombre",
                          "apellido_cliente":"$Apellido",
                          "documento":"$DNI",
                          "ubicacion":"$Direccion",
                          "contacto":"$Telefono",
                          "correo":"$Email"
                        }
                    }
                ],
                as: "info_cliente"
            }
        },
        {
            $project: {
                "_id": 0,
                "id_reserva": "$ID_Reserva",
                "estado":"$Estado",
                "info_cliente": "$info_cliente"
            }
        }
    ]).toArray();
        resolve(result);
    })
};
const getAllReservas = ()=>{
    return new Promise(async(resolve)=>{
        let result = await reservas.aggregate([
            {
                $project: {
                    "_id": 0,
                    
                }
            }
        ]).toArray();
        resolve(result);
    })
};
appReservas.get("/", configGET(),appMiddlewareReservaVerify, async(req, res)=>{
    if(!req.rateLimit) return;
    try{
        const {id, idReserva} = req.query;
        if(id){
            const data = await getReservasById(id);
            res.send(data);
        } else if(idReserva){
            const data = await getClientesReservasById(idReserva);
            res.send(data);
        }
        else {
            const data = await getAllReservas();
            res.send(data);
        }
    }
    catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});


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