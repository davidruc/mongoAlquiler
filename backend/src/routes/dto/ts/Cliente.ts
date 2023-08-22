import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

export class Cliente {
    @Expose({ name: 'id' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El id del cliente es obligatorio`}}})
    ID_Cliente: number;
    @Expose({ name: 'cliente' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El nombre del "cliente" es obligatorio`}}})
    Nombre: string;
    @Expose({ name: 'apellido' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "apellido" del cliente es obligatorio`}}})
    Apellido: string;
    @Expose({ name: 'documento' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "documento" del cliente es obligatorio`}}})
    DNI: number;
    @Expose({ name: 'direccion_contacto' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `La "direccion_contacto" del cliente es obligatorio`}}})
    Direccion: string;
    @Expose({ name: 'contacto' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El telefono de "contacto" del cliente es obligatorio`}}})
    Telefono: number;
    @Expose({ name: 'email' })
    @Transform(({ value }) => { if(value) return value ; else "sin email"})
    Email: string;
    constructor(data: Partial<Cliente>){
        Object.assign(this , data);
        this.ID_Cliente = 1;
        this.Nombre = "pedro";
        this.Apellido = "perez";
        this.DNI = 23232344324;
        this.Direccion = "cra 22#23";
        this.Telefono = 3231234233;
        this.Email = "hhuhu@weewe.com";
    }
}