import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

export class Empleado {
    @Expose({ name: 'id' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El id del empleado es obligatorio`}}})  
    ID_Empleado: number;
    @Expose({ name: 'empleado' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El nombre del "empleado" es obligatorio`}}})
    Nombre: string;
    @Expose({ name: 'apellido' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "apellido" del empleado es obligatorio`}}})
    Apellido: string;
    @Expose({ name: 'documento' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "documento" del empleado es obligatorio`}}})
    DNI: number;
    @Expose({ name: 'direccion_contacto' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `La "direccion_contacto" del empleado es obligatorio`}}})
    Direccion: string;
    @Expose({ name: 'contacto' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El telefono de "contacto" del empleado es obligatorio`}}})
    Telefono: number;
    @Expose({ name: 'email' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El telefono de "contacto" del empleado es obligatorio`}}})
    Cargo: string;
    constructor(data: Partial<Empleado>){
        Object.assign(this , data);
        this.ID_Empleado = 1;
        this.Nombre = "pedro";
        this.Apellido = "perez";
        this.DNI = 23232344324;
        this.Direccion = "cra 22#23";
        this.Telefono = 3231234233;
        this.Cargo = "gerente interino";
    }
}