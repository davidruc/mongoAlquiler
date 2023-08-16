import "reflect-metadata";
import { plainToClass, classToPlain } from "class-transformer";
import { validate } from "class-validator";
import { createInstance } from "./token.js";
import {ClienteGet} from "./DTO/ClienteGet.js"
import { Parametros } from "./DTO/Parametros.js";
import { Router } from "express";
const appMiddlewareClienteVerify = Router();
const appDTOData = Router();
const appDTOParam = Router();
const appDATA = Router();

appMiddlewareClienteVerify.use((req, res, next) =>{
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




appDTOData.use( async (req,res,next) =>{
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

export let appDATAGET = async(result)=>{
    try{
        console.log(result, "hola");
        let body = plainToClass(ClienteGet, result);
        console.log(body, "body");
        return body
        
    }catch (error){
        res.status(error.status).send(error);
    }
   
}

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
    appMiddlewareClienteVerify, appDTOData, appDTOParam
}