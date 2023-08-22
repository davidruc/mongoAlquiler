import { conexion } from "../../db/atlas.js";

class Devoluciones{
    id;
    constructor(){}
    async connect(){
        try {
            const result = await conexion("registro_devolucion");
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAllDevoluciones(){
        try {
            const connection =await this.connect();
            const result = await connection.aggregate([{
                $project: {
                "_id":0,
                "id":"$ID_Registro",
                "id_alquiler":"$ID_Alquiler_id",
                "id_empleado":"$ID_Empleado_id",
                "fecha_entrega":"$Fecha_Devolucion",
                "combustible_retornado":"$Combustible_Devuelto",
                "kilometraje_retornado":"$Kilometraje_Devuelto",
                "costo_adicional":"$Monto_Adicional",
            }}]).toArray();
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getDevolucionByID(id){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
                { $match: {"ID_Registro": parseInt(id)}},
                {
                    $project: {
                        "_id":0,
                        "id":"$ID_Registro",
                        "id_alquiler":"$ID_Alquiler_id",
                        "id_empleado":"$ID_Empleado_id",
                        "fecha_entrega":"$Fecha_Devolucion",
                        "combustible_retornado":"$Combustible_Devuelto",
                        "kilometraje_retornado":"$Kilometraje_Devuelto",
                        "costo_adicional":"$Monto_Adicional"
                    }
                }
            ]).toArray();
            return result;
        } catch (error) {
            throw error;
        }
    };
}
export {Devoluciones}