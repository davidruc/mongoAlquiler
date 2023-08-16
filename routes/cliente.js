import { Router } from "express";
import { configGET } from "../middleware/limit.js";
import expressQueryBoolean from 'express-query-boolean';
import { appMiddlewareClienteVerify, appDTOData, appDTOParam } from "../middleware/cliente.js";
import { conexion } from "../db/atlas.js";
const appCliente = Router();

let db = await conexion();
let cliente = db.collection("cliente");

appCliente.use(expressQueryBoolean());

const getClienteById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await cliente.aggregate(
            [
                { $match: { "ID_Cliente": parseInt(id) }},
                {
                    $project:{
                        "_id": 0,
                        "id": "$ID_Cliente",
                        "nombre_cliente": "$Nombre",
                        "apellido_cliente": "$Apellido",
                        "documento": "$DNI",
                        "ubicacion_cliente": "$Direccion",
                        "numero_contacto": "$Telefono",
                    }
                }
            ]).toArray();
        resolve(result);
    })
};
const getClienteByDocument = (documento)=>{
    return new Promise(async(resolve)=>{
        let result = await cliente.aggregate([
            {
                $project: {
                  "_id": 0,
                  "id_usuario": "$ID_Cliente",
                  "nombre_cliente": "$Nombre",
                  "apellido_cliente": "$Apellido",
                  "documento": "$DNI",
                  "ubicacion_cliente": "$Direccion",
                  "numero_contacto": "$Telefono",
                  "correo_electronico": "$Email"
                }
            },{
                $match:{"documento": {$eq: parseInt(documento)}}
            }
        ]).toArray();
        resolve(result);
    })
};
const getClientesByIdPendientes = (idPendientes)=>{
    return new Promise(async(resolve)=>{
        let result = await cliente.aggregate([
            {
                $lookup: {
                  from: "reserva",
                  localField: "ID_Cliente",
                  foreignField: "ID_Cliente_id",
                  pipeline: [
                    {
                        $match: {
                            "Estado": {$eq: "Apartado"}
                          }               
                    },
                    {
                        $project: {
                            "_id": 0,
                            "id_reservacion": "$ID_Reserva",
                            "estado_reserva": "$Estado",
                            "fecha_reservacion": "$Fecha_Reserva",
                            "fecha_inicio_prestamo": "$Fecha_Inicio",
                            "fecha_fin_prestamo": "$Fecha_Fin",
                        }
                    }
                  ],
                  as: "informacion_reservas"
                }
            },
            {
                $project: {
                    "_id": 0, 
                    "id_usuario": "$ID_Cliente",
                    "nombre_cliente": "$Nombre",
                    "apellido_cliente": "$Apellido",
                    "documento": "$DNI",
                    "ubicacion_cliente": "$Direccion",
                    "numero_contacto": "$Telefono",
                    "correo_electronico": "$Email",
                    "informacion_reservas": "$informacion_reservas"
                }
            },
            {
                $match: {
                  "id_usuario": {$eq: parseInt(idPendientes)}
                }
            }
        ]).toArray();
        resolve(result);
    })
}
const getAllCientes = ()=>{
    return new Promise(async(resolve)=>{
        let result = await cliente.aggregate(
            [
                {
                    $project:{
                    "_id": 0,
                    "id": "$ID_Cliente",
                    "nombre_cliente": "$Nombre",
                    "apellido_cliente": "$Apellido",
                    "documento": "$DNI",
                    "ubicacion_cliente": "$Direccion",
                    "numero_contacto": "$Telefono",
                    }
                }
            ]).toArray();
        resolve(result);
    })
};
appCliente.get("/", configGET() ,appMiddlewareClienteVerify, async(req, res)=>{
    try{
        const {id, documento, idPendientes} = req.query;
        if(id){
            const data = await getClienteById(id);
            res.send(data)
        } else if(documento){
            const data = await getClienteByDocument(documento); 
            res.send(data);
        } else if(idPendientes){
            const data = await getClientesByIdPendientes(idPendientes);
            res.send(data);
        } else {
            let data = await getAllCientes();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});
appCliente.get("/reserva_activa", async(req, res)=>{
    req.body = undefined;
    let result = await cliente.aggregate([
        {
            $lookup: {
              from: "alquiler",
              localField: "ID_Cliente",
              foreignField: "ID_Cliente_id",
              pipeline: [
                {
                    $project: {
                      "_id": 0,
                      "id_alquiler": "$ID_Alquiler",
                      "estado_alquiler": "$Estado",
                      "inicio_alquiler": "$Fecha_Inicio",
                      "fin_alquiler": "$Fecha_Fin",
                      "costo_alquiler": "$Costo_Total",
                    }
                }
              ],
              as: "info_alquiler"
            }
        },
        
        {
            $match: {
                "info_alquiler.estado_alquiler": {$eq : "activo"}
            }
        },
        {
            $project: {
                "_id": 0,
                "id": "$ID_Cliente",
                "nombre_cliente": "$Nombre",
                "apellido_cliente": "$Apellido",
                "documento": "$DNI",
                "ubicacion_cliente": "$Direccion",
                "numero_contacto": "$Telefono",
                "info_alquileres": "$info_alquiler"
            }
        },
    ]).toArray();
    res.send(result);
});
appCliente.get("/reserva_pendiente", async(req, res)=>{
    req.body = undefined;
    let result = await cliente.aggregate([
        {
            $lookup: {
                from: "reserva",
                localField: "ID_Cliente",
                foreignField: "ID_Cliente_id",
                pipeline: [
                    {
                        $lookup: {
                            from: "automovil",
                            localField: "ID_Automovil_id",
                            foreignField: "ID_Automovil",
                            pipeline: [
                                {
                                    $project: {
                                      "_id": 0,
                                      "id_auto": "$ID_Automovil",
                                      "marca_automovil": "$Marca",
                                      "modelo_automovil": "$Modelo",
                                      "año_automovil": "$Anio"
                                    }
                                }
                            ],
                            as: "info_automovil"
                        }  
                    }, 
                    {$unwind: "$info_automovil"},
                    {
                        $project: {
                            "_id": 0,
                            "id_reservacion": "$ID_Reserva",
                            "estado_reserva": "$Estado",
                            "fecha_reservacion": "$Fecha_Reserva",
                            "fecha_inicio_prestamo": "$Fecha_Inicio",
                            "fecha_fin_prestamo": "$Fecha_Fin",
                            "info_automovil": "$info_automovil"
                        }
                    }
                ],
                as: "info_reserva",
            }
        },
        {
            $match: {
              "info_reserva.estado_reserva": {$eq: "Apartado"}
            }
        },
        {$unwind: "$info_reserva"},
        {
            $project: {
              "_id": 0,
              "id_usuario": "$ID_Cliente",
              "nombre_cliente": "$Nombre",
              "apellido_cliente": "$Apellido",
              "documento": "$DNI",
              "ubicacion_cliente": "$Direccion",
              "numero_contacto": "$Telefono",
              "correo_electronico": "$Email",
              "info_reserva": "$info_reserva",
            }
        }
    ]).toArray();
    res.send(result);
});
appCliente.get("/entregados", async(req, res)=>{
    req.body = undefined;
    let result = await cliente.aggregate([
   
        {
            $lookup: {
              from: "alquiler",
              localField: "ID_Cliente",
              foreignField: "ID_Cliente_id",
              pipeline: [
                {
                    $lookup: {
                        from: "registro_devolucion",
                        localField: "ID_Alquiler",
                        foreignField: "ID_Alquiler_id",
                        pipeline: [
                            {
                                $project: {
                                  "_id": 0,
                                  "id_registro_devolucion": "$ID_Registro",
                                  "fecha_entrega": "$Fecha_Devolucion",
                                  "combustible_retornado": "$Combustible_Devuelto",
                                  "kilometraje_final": "$Kilometraje_Devuelto",
                                }
                            },
                        ],
                        as: "info_devolucion"
                      }
                },
                {
                    $match: {
                      "info_devolucion": {
                        $ne: []
                      }
                    }
                },{$unwind : "$info_devolucion"},
                {
                    $project: {
                        "_id": 0,
                        "id_alquiler": "$ID_Alquiler",
                        "estado_alquiler": "$Estado",
                        "inicio_alquiler": "$Fecha_Inicio",
                        "fin_alquiler": "$Fecha_Fin",
                        "costo_alquiler": "$Costo_Total",
                        "info_devolucion": "$info_devolucion"
                    }
                }
              ],
              as: "alquileres" 
            }
        },
        {
            $match: {
              "alquileres": {
                $ne: []
              }
            }
        }, 
        {
            $project: {
                "_id": 0, 
                "id_usuario": "$ID_Cliente",
                "nombre_cliente": "$Nombre",
                "apellido_cliente": "$Apellido",
                "documento": "$DNI",
                "ubicacion_cliente": "$Direccion",
                "numero_contacto": "$Telefono",
                "correo_electronico": "$Email",
                "alquileres": "$alquileres"
            }
        }
    ]).toArray();
    res.send(result);
});
appCliente.post("/", configGET(), appMiddlewareClienteVerify, appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    try{
        let result = await cliente.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        res.status(422).send(error)
    }
});
appCliente.put("/:id?", configGET(), appMiddlewareClienteVerify, appDTOParam ,  appDTOData, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del cliente que deseas modificar."})
    }else{
        try{
            let result = await cliente.updateOne(
                { "ID_cliente": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
appCliente.delete("/:id?", configGET(), appMiddlewareClienteVerify, appDTOParam, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del cliente que deseas eliminar."})
    } else {
        try{
            let result = await cliente.deleteOne(
                { "ID_cliente": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
})

export default appCliente;