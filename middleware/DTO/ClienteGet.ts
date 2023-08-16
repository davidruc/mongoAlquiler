import { Expose, Transform } from "class-transformer";
export class ClienteGet {
    
    @Expose({name: 'ID_Cliente'})
    id: number;

    @Expose({name: 'Nombre'})
    cliente: string;

    @Expose({name: 'Apellido'})
    apellido: string;

    @Expose({name: 'DNI'})
    documento: number;

    @Expose({name: 'Direccion'})
    direccion_contacto: string;

    @Expose({name: 'Telefono'})
    contacto: number;
    
    @Expose({name: 'Email'})
    email: string;
    
    constructor(data: Partial<ClienteGet>){
        Object.assign(this , data);
        this.id;
        this.cliente;
        this.apellido;
        this.documento;
        this.direccion_contacto;
        this.contacto;
        this.email;
    }
}