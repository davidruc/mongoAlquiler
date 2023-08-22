import "reflect-metadata";
import { plainToClass, classToPlain } from "class-transformer";
import { createInstance } from "./token.js";

const appMiddlewareAlquilerVerify = ((req, res, next) =>{
    if(!req.rateLimit) return; 
    let {payload} = req.data;
    const { iat , exp , ...newPayload} = payload;
    payload = newPayload;
    let Clone = JSON.stringify(classToPlain(plainToClass(createInstance("alquileres").class , {}, {ignoreDecorators: true})));
    let Verify = Clone === JSON.stringify(payload);
    if(!Verify){
        res.status(406).send({status : 406, message: "No autorizado"});
    } else {
        next();
    }
});

const appMiddlewareAutomovilVerify = ((req, res, next) =>{
    if(!req.rateLimit) return; 
    let {payload} = req.data;
    const { iat , exp , ...newPayload} = payload;
    payload = newPayload;
    let Clone = JSON.stringify(classToPlain(plainToClass(createInstance("autos").class , {}, {ignoreDecorators: true})));
    let Verify = Clone === JSON.stringify(payload);
    if(!Verify){
        res.status(406).send({status : 406, message: "No autorizado"});
    } else {
        next();
    }
});

const appMiddlewareClienteVerify = ((req, res, next) =>{
    if(!req.rateLimit) return; 
    let {payload} = req.data;
    const { iat , exp , ...newPayload} = payload;
    payload = newPayload;
    let Clone = JSON.stringify(classToPlain(plainToClass(createInstance("datos_clientes").class , {}, {ignoreDecorators: true})));
    let Verify = Clone === JSON.stringify(payload);
    if(!Verify){
        res.status(406).send({status : 406, message: "No autorizado"});
    } else {
        next();
    }
});

const appMiddlewareEmpleadoVerify = ((req, res, next) =>{
    if(!req.rateLimit) return; 
    let {payload} = req.data;
    const { iat , exp , ...newPayload} = payload;
    payload = newPayload;
    let Clone = JSON.stringify(classToPlain(plainToClass(createInstance("datos_empleado").class , {}, {ignoreDecorators: true})));
    let Verify = Clone === JSON.stringify(payload);
    if(!Verify){
        res.status(406).send({status : 406, message: "No autorizado"});
    } else {
        next();
    }
});


const appMiddlewareDevolucionVerify = ((req, res, next) =>{
    if(!req.rateLimit) return; 
    let {payload} = req.data;
    const { iat , exp , ...newPayload} = payload;
    payload = newPayload;
    let Clone = JSON.stringify(classToPlain(plainToClass(createInstance("devolucion").class , {}, {ignoreDecorators: true})));
    let Verify = Clone === JSON.stringify(payload);
    if(!Verify){
        res.status(406).send({status : 406, message: "No autorizado"});
    } else {
        next();
    }
});

const appMiddlewareEntregasVerify = ((req, res, next) =>{
    if(!req.rateLimit) return; 
    let {payload} = req.data;
    const { iat , exp , ...newPayload} = payload;
    payload = newPayload;
    let Clone = JSON.stringify(classToPlain(plainToClass(createInstance("entrega").class , {}, {ignoreDecorators: true})));
    let Verify = Clone === JSON.stringify(payload);
    if(!Verify){
        res.status(406).send({status : 406, message: "No autorizado"});
    } else {
        next();
    }
});

const appMiddlewareReservaVerify = ((req, res, next) =>{
    if(!req.rateLimit) return; 
    let {payload} = req.data;
    const { iat , exp , ...newPayload} = payload;
    payload = newPayload;
    let Clone = JSON.stringify(classToPlain(plainToClass(createInstance("reservacion").class , {}, {ignoreDecorators: true})));
    let Verify = Clone === JSON.stringify(payload);
    if(!Verify){
        res.status(406).send({status : 406, message: "No autorizado"});
    } else {
        next();
    }
});

const appMiddlewareSucursalxAutoVerify = ((req, res, next) =>{
    if(!req.rateLimit) return; 
    let {payload} = req.data;
    const { iat , exp , ...newPayload} = payload;
    payload = newPayload;
    let Clone = JSON.stringify(classToPlain(plainToClass(createInstance("SucursalxAuto").class , {}, {ignoreDecorators: true})));
    let Verify = Clone === JSON.stringify(payload);
    if(!Verify){
        res.status(406).send({status : 406, message: "No autorizado"});
    } else {
        next();
    }
});

const appMiddlewareSucursalVerify = ((req, res, next) =>{
    if(!req.rateLimit) return; 
    let {payload} = req.data;
    const { iat , exp , ...newPayload} = payload;
    payload = newPayload;
    let Clone = JSON.stringify(classToPlain(plainToClass(createInstance("Sucursales").class , {}, {ignoreDecorators: true})));
    let Verify = Clone === JSON.stringify(payload);
    if(!Verify){
        res.status(406).send({status : 406, message: "No autorizado"});
    } else {
        next();
    }
});
export {
    appMiddlewareAlquilerVerify, 
    appMiddlewareAutomovilVerify,
    appMiddlewareClienteVerify, 
    appMiddlewareEmpleadoVerify,
    appMiddlewareDevolucionVerify,
    appMiddlewareEntregasVerify,
    appMiddlewareReservaVerify,
    appMiddlewareSucursalxAutoVerify,
    appMiddlewareSucursalVerify
}