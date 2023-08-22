import express from "express";
import initApiRoutes from "./src/routes/routes.js";
import config from "./src/utils/config.js"

const app = express();
app.use(express.json());
app.use("/api", initApiRoutes());

app.listen(config.server, ()=>{
    console.log(`El servidor está activo: http://${config.server.hostname}:${config.server.port}`);
})

/* import dotenv from "dotenv";
import express from "express";
import appAutomovil from "./routes/automovil.js";
import appAlquiler from "./routes/alquiler.js";
import appCliente from "./routes/cliente.js";
import appEmpleado from "./routes/empleado.js";
import appDevoluciones from "./routes/devoluciones.js";
import appEntregas from "./routes/entregas.js";
import appReservas from "./routes/reservas.js";
import appSucursalxAuto from "./routes/sucursal_auto.js";
import appSucursal from "./routes/sucursal.js";
import { appToken, appVerify } from "./middleware/token.js";
dotenv.config();
const app = express()

app.use(express.json());
app.use("/token", appToken)
app.use("/autos", appVerify , appAutomovil);
app.use("/alquileres", appVerify ,appAlquiler);
app.use("/datos_clientes", appVerify ,appCliente);
app.use("/datos_empleado", appVerify, appEmpleado);
app.use("/devolucion", appVerify,appDevoluciones);
app.use("/entrega", appVerify,appEntregas);
app.use("/reservacion", appVerify,appReservas);
app.use("/SucursalxAuto", appVerify,appSucursalxAuto);
app.use("/Sucursales", appVerify,appSucursal);

const config = JSON.parse(process.env.MY_SERVER);






 */