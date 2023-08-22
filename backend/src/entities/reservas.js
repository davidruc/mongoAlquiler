import { conexion} from "../../db/atlas.js";

class Reservas {
    constructor(){};
    async connect(){
        try {
            const result = await conexion("reserva");
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAllReservas(){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
                {
                    $project: {
                        "_id": 0,
                        "id_alquiler": "$ID_Reserva",
                        "id_cliente": "$ID_Cliente_id",
                        "id_automovil": "$ID_Automovil_id",
                        "fecha_reservacion": "$Fecha_Reserva",
                        "inicio_alquiler": "$Fecha_Inicio",
                        "fin_alquiler": "$Fecha_Fin",
                        "estado_reserva": "$Estado",
    
                    }
                }
            ]).toArray();
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getReservasByID(id){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
                { $match: { "ID_Reserva": parseInt(id)}},
                {
                    $project: {
                        "_id": 0,
                        "id_alquiler": "$ID_Reserva",
                        "id_cliente": "$ID_Cliente_id",
                        "id_automovil": "$ID_Automovil_id",
                        "fecha_reservacion": "$Fecha_Reserva",
                        "inicio_alquiler": "$Fecha_Inicio",
                        "fin_alquiler": "$Fecha_Fin",
                        "estado_reserva": "$Estado",
                    }
                }
            ]).toArray();
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getReservasByidCliente(id){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
                {
                    $lookup: {
                        from: "cliente",
                        localField: "ID_Cliente_id",
                        foreignField: "ID_Cliente",
                        pipeline: [
                            {
                                $match: {
                                    ID_Cliente: parseInt(id)
                                }
                            },
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
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getReservasByIDClientInfo(id){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
                {
                    $match: {
                        ID_Reserva: parseInt(id)
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
        return result;
        } catch (error) {
            throw error;
        }
    }
};

export {Reservas};