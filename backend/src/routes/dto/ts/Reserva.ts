import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

export class Reservas {
    @Expose({ name: 'id_alquiler' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "id_alquiler" de la devolucion es obligatorio`}}})
    ID_Reserva: number;
    @Expose({ name: 'id_cliente' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "id_cliente" es obligatorio`}}})
    ID_Cliente_id: number;
    @Expose({ name: 'id_automovil' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "id_automovil" es obligatorio`}}})
    ID_Automovil_id: number;
    @Expose({name: "fecha_reservacion"})
    @IsDefined({message: ()=>{ throw {status: 422, message: `La "fecha_reservacion" es un campo obligatorio`}}})
    Fecha_Reserva: Date;
    @Expose({name: "inicio_alquiler"})
    @IsDefined({message: ()=>{ throw {status: 422, message: `La "inicio_alquiler" es un campo obligatorio`}}})
    Fecha_Inicio: Date;
    @Expose({name: "fin_alquiler"})
    @IsDefined({message: ()=>{ throw {status: 422, message: `La "fin_alquiler" es un campo obligatorio`}}})
    Fecha_Fin: Date;
    @Expose({ name: 'estado_reserva' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "estado_reserva" del alquiler es obligatorio`}}})
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