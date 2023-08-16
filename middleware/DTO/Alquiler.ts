import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

export class Alquiler {
    @Expose({ name: 'id_alquiler' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "id_alquiler" del alquiler es obligatorio`}}})
    ID_Alquiler: number;
    @Expose({ name: 'id_cliente' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "id_cliente" es obligatorio`}}})
    ID_Cliente_id: number;
    @Expose({ name: 'id_automovil' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "id_automovil" es obligatorio`}}})
    ID_Automovil_id: number;
    @Expose({name: "inicio_alquiler"})
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "inicio_alquiler" es obligatorio`}}})
    Fecha_Inicio: Date;
    @Expose({name: "fin_alquiler"})
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "fin_alquiler" es obligatorio`}}})
    Fecha_Fin: Date;
    @Expose({ name: 'costo_final' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "costo_final" del alquiler es obligatorio`}}})
    Costo_Total: number;
    @Expose({ name: 'estado_alquiler' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "estado_alquiler" es obligatorio`}}})
    Estado: string;
    constructor(data: Partial<Alquiler>){
        Object.assign(this , data);
        this.ID_Alquiler = 1;
        this.ID_Cliente_id = 1;
        this.ID_Automovil_id = 1;
        this.Fecha_Inicio = new Date(2023,9,21);
        this.Fecha_Fin = new Date(2023,9,23);
        this.Costo_Total = 70000;
        this.Estado = "activo";
    }
}