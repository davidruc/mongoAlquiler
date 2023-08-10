import "reflect-metadata";
import { plainToClass, classToPlain } from "class-transformer";
import { validate } from "class-validator";
import { Automovil } from "./DTO/Automovil.js";
import { Router } from "express";
const appMiddlewareAutomovilVerify = Router();
const appDTOData = Router();

appMiddlewareAutomovilVerify.use((req, res, next) =>{
    if(!req.rateLimit) return; 
    console.log(req.data);
    let {payload} = req.data;
    
    const { iat , exp , ...newPayload} = payload;
    payload = newPayload;
    
    let Clone = JSON.stringify(classToPlain(plainToClass(Automovil, {}, {ignoreDecorators: true})));
    let Verify = Clone === JSON.stringify(payload);
    if(!Verify){
        res.status(406).send({status : 406, message: "No autorizado"});
    } else {
        next();
    }
});

appDTOData.use( async (req,res,next) =>{
    try{
        let data = plainToClass( Automovil, req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data = undefined;
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
});

export {
    appMiddlewareAutomovilVerify, appDTOData
}