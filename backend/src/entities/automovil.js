import {conexion} from "../../db/atlas.js";

class Automovil{
    id;
    ID_Automovil;
    Marca;
    Modelo;
    Anio;
    Tipo;
    Capacidad;
    Precio_Diario;
    constructor(){}
    async connect(){
        try {
            const result = await conexion("automovil");
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAllautomoviles(){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
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
            return result;
        } catch (error) {
            throw error.stack;
        }
    };
    async getAutomovilesByID(id){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
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

            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAutomovilGrande(){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
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
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAutomovilMarcas(){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
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
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAutomovilDisponibleGrande(){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
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
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export { Automovil };