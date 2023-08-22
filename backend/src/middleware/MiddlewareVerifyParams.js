import "reflect-metadata";
import { plainToClass} from "class-transformer";
import { validate } from "class-validator";
import { Parametros } from "../routes/dto/js/Parametros.js";

const appDTOParam = ("/:id", async (req, res, next)=>{
    try{
        let parametro = plainToClass(Parametros, req.params);
        await validate(parametro);
        next();
    }catch (error){
        res.status(error.status).send(error);
    }
});

export {
    appDTOParam
}