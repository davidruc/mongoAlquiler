import {conexion} from "../../db/atlas.js";

class Sucursal {
    constructor(){};
    async connect(){
        try {
            const result = await conexion("sucursal");
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getAllSucursales(){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
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
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getSucursalByID(id){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
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
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getSucursalPorCantidadTotal(){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
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
            return result;
        } catch (error) {
            throw error;
        }
    }
};

export {Sucursal};