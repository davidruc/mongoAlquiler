import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

export class Entregas {
    @Expose({ name: 'id' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "id" de la devolucion es obligatorio`}}})
    ID_Registro: number;
    @Expose({ name: 'id_alquiler' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "id_alquiler" es obligatorio`}}})
    ID_Alquiler_id: number;
    @Expose({ name: 'id_empleado' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "id_empleado" es obligatorio`}}})
    ID_Empleado_id: number;
    @Expose({name: "fecha_inicio"})
    @IsDefined({message: ()=>{ throw {status: 422, message: `La "fecha_inicio" es un campo obligatorio`}}})
    Fecha_Entrega: Date;
    @Expose({ name: 'combustible_actual' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "combustible_actual" del alquiler es obligatorio`}}})
    Combustible_Entregado: number;
    @Expose({ name: 'Kilometraje_actual' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "Kilometraje_actual" del alquiler es obligatorio`}}})
    Kilometraje_Entregado: number;
    
    constructor(data: Partial<Entregas>){
        Object.assign(this , data);
        this.ID_Registro = 1;
        this.ID_Alquiler_id = 1;
        this.ID_Empleado_id = 1;
        this.Fecha_Entrega = new Date(2023,9,21);
        this.Combustible_Entregado = 70000;
        this.Kilometraje_Entregado = 30000;
    }
}