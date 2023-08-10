import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

export class Automovil {
    @Expose({ name: 'id' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El id del automovil es obligatorio`}}})
    ID_Automovil: number;
    @Expose({ name: 'marca_automovil' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El marca_automovil del automovil es obligatorio`}}})
    Marca: string;
    @Expose({ name: 'modelo_automovil' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El modelo_automovil del automovil es obligatorio`}}})
    Modelo: string;
    @Expose({ name: 'year' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El año del automovil es obligatorio`}}})
    Anio: number;
    @Expose({ name: 'tipo' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El tipo del automovil es obligatorio`}}})
    Tipo: string;
    @Expose({ name: 'cupo' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El cupo del automovil es obligatorio`}}})
    Capacidad: number;
    @Expose({ name: 'valor_dia' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El valor_dia del automovil es obligatorio`}}})
    Precio_Diario: number;
    constructor(data: Partial<Automovil>){
        Object.assign(this , data);
        this.ID_Automovil = 1;
        this.Marca = "Chevrolet";
        this.Modelo = "Picanto";
        this.Anio = 2020;
        this.Tipo = "Automovil";
        this.Capacidad = 5;
        this.Precio_Diario = 70000;
    }
}