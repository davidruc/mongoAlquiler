import 'reflect-metadata';
import {plainToClass, classToPlain } from 'class-transformer';
import dotenv from 'dotenv';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import {Automovil} from "../routes/dto/js/Automovil.js";
import {Alquiler} from "../routes/dto/js/Alquiler.js";
import {Cliente} from "../routes/dto/js/Cliente.js";
import {Empleado} from "../routes/dto/js/Empleado.js";
import {Devoluciones} from "../routes/dto/js/registro_devolucion.js";
import {Reservas} from "../routes/dto/js/Reserva.js";
import {Entregas} from "../routes/dto/js/registro_entrega.js";
import {SucursalAuto} from "../routes/dto/js/sucursal_automovil.js";
import {Sucursal} from "../routes/dto/js/Sucursal.js";

dotenv.config("../");
const appToken = Router();
const appVerify = Router();

const createInstance = (className) => {
    const classMap = {
      'autos': Automovil,
      'alquileres': Alquiler,
      'datos_clientes': Cliente,
      'datos_empleado': Empleado,
      'devolucion': Devoluciones,
      'reservacion': Reservas,
      'entrega': Entregas,
      'SucursalxAuto': SucursalAuto,
      'Sucursales': Sucursal
    };
    const Class = classMap[className];
    if(!Class) throw {status: 404, message: "Token solicitado no valido"}
    return {atributos: plainToClass(Class, {}, { ignoreDecorators: true }), class: Class}
    
};
appToken.use("/:collection", async(req,res)=>{
    try {
        console.log("hodf");
        const inst = createInstance(req.params.collection).atributos;
        const encoder = new TextEncoder();
        const jwtconstructor = new SignJWT(Object.assign({}, classToPlain(inst)));
        const jwt = await jwtconstructor
        .setProtectedHeader({alg:"HS256", typ: "JWT"})
        .setIssuedAt()
        .setExpirationTime("30m")
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        req.data = jwt;
        res.status(201).send({status: 201, message: jwt});
    } catch (error) {
        res.status(error.status).send(error);
    }
})

appVerify.use("/", async(req,res,next)=>{
    const {authorization} = req.headers;
    if (!authorization) return res.status(400).send({status: 400, token: "Token no enviado"});
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        req.data = jwtData;
        
        next();
    } catch (error) {
        res.status(498).send({status: 498, token: "Token caducado"});
    }
})

export {
    appToken, appVerify, createInstance
};