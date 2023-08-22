import { Router } from "express";
import getInitRoute from "./getData.js";
import { appToken, appVerify } from "../middleware/token.js";
import { configGET } from "../middleware/limit.js";

const initApiRoutes=()=>{
    const router = Router();
    router.use("/token", appToken);
    router.use("/get", appVerify, configGET(), getInitRoute());
    return router;  

}
export default initApiRoutes;