import rateLimit from "express-rate-limit";

export let configGET = ()=>{
    return rateLimit({
        windowMs: 30*1000,
        max: 5,
        standardHeaders: true,
        legacyHeaders:false,
        skip: (req,res)=>{
            if (req.headers["content-length"]>240) {
                res.status(413).send({
                    status: 413,
                    message: "El tamaño es demasiado grande"
                });
                return true;
            }
        },
        message: (req, res)=>{
            res.status(429).send({
                status: 429, 
                message: "ya se te acabaron las solicitudes"
            });
        } 
})
}

//como evitar que se sobrescriban las colecciones cuando  sobrepasa el límite máximo