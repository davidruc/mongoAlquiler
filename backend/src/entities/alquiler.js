import {conexion} from "../../db/atlas.js";

class Alquiler{
    id;
    ID_Cliente;
    ID_Automovil;
    Fecha_Reserva;
    Fecha_Inicio;
    Fecha_Fin;
    Estado;
    constructor() {}
    async connect() {
        try {
          const result = await conexion("alquiler");
          return result;
        } catch (error) {
          throw error;
        }
    };
    async getAllAlquileres(){
      try{
        const connection = await this.connect();
        const result = await connection.aggregate([
          {
              $project: {
                  "_id": 0,
                  "id_alquiler": "$ID_Alquiler",
                  "inicio_alquiler": "$Fecha_Inicio",
                  "fin_alquiler": "$Fecha_Fin",
                  "costo_final": "$Costo_Total",
                  "estado_alquiler": "$Estado",
              }
          }
      ]).toArray()
      return result;
      } catch (error){
        console.error(error);
      }
    }; 
    async getAlquileresById(id){
      try {
        const connection = await this.connect();
        const result = await connection.aggregate([
          { $match: { "ID_Alquiler": parseInt(id)}},
            {
                $project: {
                    "_id": 0,
                    "id_alquiler": "$ID_Alquiler",
                    "inicio_alquiler": "$Fecha_Inicio",
                    "fin_alquiler": "$Fecha_Fin",
                    "costo_final": "$Costo_Total",
                    "estado_alquiler": "$Estado",
                }
            }
      ]).toArray()
      return result;
      } catch (error) {
        throw error;
      }
    };
    async getAlquileresByTotalCliente(idAlquiler){
      try {
        const connection = await this.connect();
        const result = await connection.aggregate([
          {
              $project: {
                "_id": 0,
                "id_alquier": "$ID_Alquiler",
                "id_cliente": "$ID_Cliente_id",
                "costo_final": "$Costo_Total"
              }
          },
          {
              $match: {
                  "id_alquier": {$eq: parseInt(idAlquiler)}
              }
          }
      ]).toArray()
      return result;
      } catch (error) {
        throw error;
      }
    };
    async getAlquileresPorDia(){
      try {
        const connection = await this.connect();
        const result = await connection.aggregate([
          {
              $match: {
                  "Fecha_Inicio": {$eq: "2024-02-15"}
              }
          }, {
              $project: {
                  "_id": 0,
                  "id_alquiler": "$ID_Alquiler",
                  "inicio_alquiler": "$Fecha_Inicio",
                  "fin_alquiler": "$Fecha_Fin",
                  "costo_final": "$Costo_Total",
                  "estado_alquiler": "$Estado",
              }
          }
      ]).toArray()
      return result;
      } catch (error) {
        throw error;
      }
    };
    async getAlquileresPorPlazos(){
      try {
        const connection = await this.connect();
        const result = await connection.find({
          "Fecha_Inicio": {
              $gte: "2023-08-11",
              $lte: "2025-09-11"
          }
      }).toArray()
      return result;
      } catch (error) {
        throw error;
      }
    };
    async getAlquileresPorTotal(){
      try {
        const connection = await this.connect();
        const result = await connection.aggregate([
          {$count: 'ID_Alquiler'},
          {
              $project: {
                  'Total de Alquileres' : '$ID_Alquiler'
              }
          }
      ]).toArray();
      return result;
      } catch (error) {
        throw error;
      }
    }
}
    



export {Alquiler};
