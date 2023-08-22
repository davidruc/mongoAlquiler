import {conexion} from "../../db/atlas.js";

class sucursalAuto{
    id
    constructor(){};
    async connect(){
        try {
            const result = await conexion("sucursal_automovil");
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAllSucursalAuto(){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
                {
                    $project: {
                        "_id": 0,
                        "id_sucursal": "$ID_Sucursal_id",
                        "id_auto": "$ID_Automovil_id",
                        "cantidad_disponible": "$Cantidad_Disponible"
                    }
                }
            ]).toArray();
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getSucursalAutoByID(id){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
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
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getSucursalAutoTotal(){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
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
            return result;
        } catch (error) {
            throw error;
        }
    }
}
export {sucursalAuto}