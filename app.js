/* import { Collection } from "mongodb"; */

import dotenv from "dotenv";
import express from "express";
import appAutomovil from "./routes/automovil.js";

dotenv.config();
const app = express()

app.use("/autos", appAutomovil)



const config = JSON.parse(process.env.MY_SERVER);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
})





/* import { conexion } from "./db/atlas.js";
let db = await conexion(); */

//Como saber si la conexion que voy a crear existe
/* const collections = await db.listCollections().toArray();
const bandera = collections.some((collection)=> collection.name === "automovil");
console.log(bandera); */
