import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

export class Devoluciones {
    @Expose({ name: 'id' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "id" de la devolucion es obligatorio`}}})
    ID_Registro: number;
    @Expose({ name: 'id_alquiler' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "id_alquiler" es obligatorio`}}})
    ID_Alquiler_id: number;
    @Expose({ name: 'id_empleado' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "id_empleado" es obligatorio`}}})
    ID_Empleado_id: number;
    @Expose({name: "fecha_entrega"})
    @IsDefined({message: ()=>{ throw {status: 422, message: `La "fecha_entrega" es un campo obligatorio`}}})
    Fecha_Devolucion: Date;
    @Expose({ name: 'combustible_retornado' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "combustible_retornado" del alquiler es obligatorio`}}})
    Combustible_Devuelto: number;
    @Expose({ name: 'kilometraje_retornado' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "kilometraje_retornado" del alquiler es obligatorio`}}})
    Kilometraje_Devuelto: number;
    @Expose({ name: 'costo_adicional' })
    @Transform(({ value }) => { if(value) return value ; else 0})
    Monto_Adicional: number;
    
    constructor(data: Partial<Devoluciones>){
        Object.assign(this , data);
        this.ID_Registro = 1;
        this.ID_Alquiler_id = 1;
        this.ID_Empleado_id = 1;
        this.Fecha_Devolucion = new Date(2023,9,21);
        this.Combustible_Devuelto = 70000;
        this.Kilometraje_Devuelto = 30000;
        this.Monto_Adicional = 10000
    }
}