import { rateLimit } from "express-rate-limit";

export let configGET = ()=>{
    return rateLimit({
        windowMs: 30*1000,
        max: 5,
        standardHeaders: true,
        legacyHeaders:false,
        message: {status: 429, message: "ya se te acabaron las solicitudes"}
    })
}