import { conexion } from "../../db/atlas.js";

class Entregas {
    constructor(){};
    async connect(){
        try {
            const result = await conexion("resgistro_entrega");
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAllEntregas(){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
                {
                    $project: {
                        "_id": 0,
                        "id": "$ID_Registro",
                        "id_alquiler": "$ID_Alquiler_id",
                        "id_empleado": "$ID_Empleado_id",
                        "fecha_inicio": "$Fecha_Entrega", 
                        "combustible_actual": "$Combustible_Entregado",
                        "Kilometraje_actual": "$Kilometraje_Entregado",
                    }
                }
            ]).toArray();
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getEntregasByID (id){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
                {$match: { "ID_Registro": parseInt(id)}},
                {
                    $project: {
                        "_id": 0,
                        "id": "$ID_Registro",
                        "id_alquiler": "$ID_Alquiler_id",
                        "id_empleado": "$ID_Empleado_id",
                        "fecha_inicio": "$Fecha_Entrega", 
                        "combustible_actual": "$Combustible_Entregado",
                        "Kilometraje_actual": "$Kilometraje_Entregado",
                    }
                }
            ]).toArray();
            return result;
        } catch (error) {
            throw error;
        }
    }
}
export {Entregas}