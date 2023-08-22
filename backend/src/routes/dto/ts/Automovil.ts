import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

export class Automovil {
    @Expose({ name: 'id_auto' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "id_auto" del automovil es obligatorio`}}})
    ID_Automovil: number;
    @Expose({ name: 'marca_auto' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "marca_auto" del automovil es obligatorio`}}})
    Marca: string;
    @Expose({ name: 'modelo_auto' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "modelo_auto" del automovil es obligatorio`}}})
    Modelo: string;
    @Expose({ name: 'year_auto' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "year_auto" del automovil es obligatorio`}}})
    Anio: number;
    @Expose({ name: 'tipo_auto' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "tipo_auto" del automovil es obligatorio`}}})
    Tipo: string;
    @Expose({ name: 'capacidad_auto' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "capacidad_auto" del automovil es obligatorio`}}})
    Capacidad: number;
    @Expose({ name: 'costo_dia' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "costo_dia" del automovil es obligatorio`}}})
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