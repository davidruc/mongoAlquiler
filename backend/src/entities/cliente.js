import { conexion } from "../../db/atlas.js";

class Cliente {
    id;
    ID_Cliente;
    Nombre;
    Apellido;
    DNI;
    Direccion;
    Telefono;
    Email;
    constructor(){};
    async connect (){
        try {
            const result = await conexion("cliente");
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAllClientes(){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate(
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
                return result;
        } catch (error) {
            throw error;
        }
    };
    async getClientesByID(id){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate(
                [
                    { $match: { "ID_Cliente": parseInt(id)}},
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
                return result;
        } catch (error) {
            throw error;
        }
    };
    async getClientesByDocumento(doc){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
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
                    $match:{"documento": {$eq: parseInt(doc)}}
                }
            ]).toArray();
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getClientesByIDEstadoPendiente(id){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
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
                      "id_usuario": {$eq: parseInt(id)}
                    }
                }
            ]).toArray();
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getClientesConReservaActiva(){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
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
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getClientesConReservaPendiente(){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
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
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getClientesServiciosEntregados(){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
   
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
            return result;
        } catch (error) {
            throw error;
        }
    }; 

}

export { Cliente }