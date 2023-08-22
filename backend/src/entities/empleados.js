import { conexion } from "../../db/atlas.js";

class Empleados{
    constructor(){};
    async connect(){
        try {
            const result = await conexion("empleado");
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAllEmpleados(){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
                {
                    $project: {
                        "_id": 0,
                        "id_empleado": "$ID_Empleado",
                        "nombre_empleado": "$Nombre",
                        "documento_identidad": "$DNI",
                        "direccion_residencia": "$Direccion",
                        "numero_contacto": "$Telefono",
                        "cargo_empleado": "$Cargo"
                    }
                }
            ]).toArray();
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getEmpleadosByID(id){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
                { $match: { "ID_Empleado": parseInt(id)}},
                {
                    $project: {
                      "_id": 0,
                      "id_empleado": "$ID_Empleado",
                      "nombre_empleado": "$Nombre",
                      "documento_identidad": "$DNI",
                      "direccion_residencia": "$Direccion",
                      "numero_contacto": "$Telefono",
                      "cargo_empleado": "$Cargo"
                    }
                }
            ]).toArray();
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getEmpleadoVendedor(){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
                {
                    $match: {
                      "Cargo": "Agente de Entrega"
                    }
                },
                {
                    $project: {
                        "_id": 0,
                        "id_empleado": "$ID_Empleado",
                        "nombre_empleado": "$Nombre",
                        "documento_identidad": "$DNI",
                        "direccion_residencia": "$Direccion",
                        "numero_contacto": "$Telefono",
                        "cargo_empleado": "$Cargo"
                    }
                }
            ]).toArray();
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getEmpleadoGerenteOAsistente(){
        try {
            const connection = await this.connect();
            const result = await connection.aggregate([
                {
                    $match: {
                        $or: [{Cargo: "Gerente"}, {Cargo: "Asistente"}]
                    }
                },
                {
                    $project: {
                        "_id": 0,
                        "id_empleado": "$ID_Empleado",
                        "nombre_empleado": "$Nombre",
                        "documento_identidad": "$DNI",
                        "direccion_residencia": "$Direccion",
                        "numero_contacto": "$Telefono",
                        "cargo_empleado": "$Cargo"
                    }
                }
            ]).toArray();
            return result;
        } catch (error) {
            throw error;
        }
    };
};
export {Empleados}