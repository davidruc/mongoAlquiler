import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

export class Sucursal {
    @Expose({ name: 'id' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El id de la sucursal es obligatorio`}}})
    ID_Sucursal: number;
    @Expose({ name: 'sucursal' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El nombre de la "sucursal" es obligatorio`}}})
    Nombre: string;
    @Expose({ name: 'ubicacion' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `La "ubicacion" de la sucursal es obligatorio`}}})
    Direccion: string;
    @Expose({ name: 'contacto' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El telefono de "contacto" de la sucursal es obligatorio`}}})
    Telefono: number;
   
    Email: string;
    constructor(data: Partial<Sucursal>){
        Object.assign(this , data);
        this.ID_Sucursal = 1;
        this.Nombre = "pedro";
        this.Direccion = "cra 22#23";
        this.Telefono = 3231234233;
    }
}