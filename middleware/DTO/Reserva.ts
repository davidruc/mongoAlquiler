import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

export class Reservas {
    @Expose({ name: 'id' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "id" de la devolucion es obligatorio`}}})
    ID_Reserva: number;
    @Expose({ name: 'id_cliente' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "id_cliente" es obligatorio`}}})
    ID_Cliente_id: number;
    @Expose({ name: 'id_automovil' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "id_automovil" es obligatorio`}}})
    ID_Automovil_id: number;
    @Expose({name: "reserva_fecha"})
    @IsDefined({message: ()=>{ throw {status: 422, message: `La "reserva_fecha" es un campo obligatorio`}}})
    Fecha_Reserva: Date;
    @Expose({name: "inicio_fecha"})
    @IsDefined({message: ()=>{ throw {status: 422, message: `La "inicio_fecha" es un campo obligatorio`}}})
    Fecha_Inicio: Date;
    @Expose({name: "fin_fecha"})
    @IsDefined({message: ()=>{ throw {status: 422, message: `La "fin_fecha" es un campo obligatorio`}}})
    Fecha_Fin: Date;
    @Expose({ name: 'combustible_retornado' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "combustible_retornado" del alquiler es obligatorio`}}})
    Estado: string;
    
    
    constructor(data: Partial<Reservas>){
        Object.assign(this , data);
        this.ID_Reserva = 1;
        this.ID_Cliente_id = 1;
        this.ID_Automovil_id = 1;
        this.Fecha_Reserva = new Date(2023,9,21);
        this.Fecha_Inicio = new Date(2023,9,21);
        this.Fecha_Fin = new Date(2023,9,21);
        this.Estado = "activo"
    }
}