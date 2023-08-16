import "reflect-metadata";
import { plainToClass, classToPlain } from "class-transformer";
import { validate } from "class-validator";
import { createInstance } from "./token.js";
import { Parametros } from "./DTO/Parametros.js";
import { Router } from "express";
const appMiddlewareAlquilerVerify = Router();
const appDTOData = Router();
const appDTOParam = Router();

appMiddlewareAlquilerVerify.use((req, res, next) =>{
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

appDTOData.use( async (req,res,next) =>{
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

appDTOParam.use("/:id", async (req, res, next)=>{
    try{
        let parametro = plainToClass(Parametros, req.params);
        await validate(parametro);
        next();
    }catch (error){
        res.status(error.status).send(error);
    }
});

export {
    appMiddlewareAlquilerVerify, appDTOData, appDTOParam
}