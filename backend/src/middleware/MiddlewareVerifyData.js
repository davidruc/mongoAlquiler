import "reflect-metadata";
import { plainToClass} from "class-transformer";
import { validate } from "class-validator";
import { createInstance } from "./token.js";


const appDTODataAlquiler = ( async (req,res,next) =>{
    try{
        let data = plainToClass(createInstance("alquileres").class , req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data = undefined;
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
});


const appDTODataAuto = ( async (req,res,next) =>{
    try{
        let data = plainToClass(createInstance("autos").class , req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data = undefined;
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
});

const appDTODataCliente = ( async (req,res,next) =>{
    try{
        let data = plainToClass(createInstance("datos_clientes").class , req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data = undefined;
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
});

const appDTODataEmpleado = ( async (req,res,next) =>{
    try{
        let data = plainToClass(createInstance("datos_empleado").class , req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data = undefined;
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
});

const appDTODataDevolucion = ( async (req,res,next) =>{
    try{
        let data = plainToClass(createInstance("devolucion").class , req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data = undefined;
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
});

const appDTODataEntrega = ( async (req,res,next) =>{
    try{
        let data = plainToClass(createInstance("entrega").class , req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data = undefined;
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
});

const appDTODataReserva = ( async (req,res,next) =>{
    try{
        let data = plainToClass(createInstance("reservacion").class , req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data = undefined;
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
});

const appDTODataSucursalAuto = ( async (req,res,next) =>{
    try{
        let data = plainToClass(createInstance("SucursalxAuto").class , req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data = undefined;
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
});

const appDTODataSucursal =( async (req,res,next) =>{
    try{
        let data = plainToClass(createInstance("Sucursales").class , req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data = undefined;
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
});

export{ 
    appDTODataAlquiler,
    appDTODataAuto,
    appDTODataCliente,
    appDTODataEmpleado,
    appDTODataDevolucion,
    appDTODataEntrega,
    appDTODataReserva,
    appDTODataSucursalAuto,
    appDTODataSucursal
}