import dotenv from "dotenv";
import express from "express";
import appAutomovil from "./routes/automovil.js";
import { appToken, appVerify } from "./middleware/token.js";
dotenv.config();
const app = express()

app.use(express.json());
app.use("/token", appToken)
app.use("/autos", appVerify , appAutomovil)



const config = JSON.parse(process.env.MY_SERVER);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
})





