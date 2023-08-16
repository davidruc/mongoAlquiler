import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

export class SucursalAuto {
    @Expose({ name: 'id_sucursal' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "id_sucursal" es obligatorio`}}})
    ID_Sucursal_id: number;
    @Expose({ name: 'id_automovil' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "id_automovil" es obligatorio`}}})
    ID_Automovil_id: number;
    @Expose({ name: 'cantidad' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El "cantidad" es obligatorio`}}})
    Cantidad_Disponible: number;
    
   
    Email: string;
    constructor(data: Partial<SucursalAuto>){
        Object.assign(this , data);
        this.ID_Sucursal_id = 1;
        this.ID_Automovil_id = 1;
        this.Cantidad_Disponible = 1;
    }
}