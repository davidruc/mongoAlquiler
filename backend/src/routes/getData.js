import { Router } from "express";
import { obtenerAllAlquileresController, obtenerAlquileresByIDController, obtenerAlquileresByTotalClienteController, obtenerAlquileresPorDiaController, obtenerAlquileresPorPlazosController, obtenerAlquileresPorTotalController, obtenerAllAutomovilesController, obtenerAutomovilesByIDController, obtenerAllClientesController, obtenerClientesByIDController, obtenerAllDevolucionesController, obtenerDevolucionesByIDController, obtenerAllEmpleadosController, obtenerEmpleadosByIDController, obtenerAllEntregasController, obtenerEntregasByIDController, obtenerAllReservasController, obtenerReservasByIDController, obtenerAllSucursalesController, obtenerSucursalesByIDController, obtenerAllSucursalAutoController, obtenerSucursalAutoByIDController, obtenerAutomovilGrandeController, obtenerAutomovilMarcasController, obtenerAutomovilDisponibleGrandeController, obtenerClientesByDocumentoController, obtenerClientesEstadoPendienteController, obtenerClientesConReservaActivaController, obtenerClientesConReservaPendienteController, obtenerClientesServiciosEntregadosController, obtenerEmpleadosVendedoresController, obtenerEmpleadosGerentesOasistentesController, obtenerReservasByidClienteController, obtenerReservasByidClienteInfoController, obtenerSucursalPorCantidadTotalController, obtenerSucursalAutoTotalController
} from "../controllers/getDataController.js";

import {  appMiddlewareAlquilerVerify,  appMiddlewareAutomovilVerify, appMiddlewareClienteVerify,  appMiddlewareEmpleadoVerify, appMiddlewareDevolucionVerify, appMiddlewareEntregasVerify, appMiddlewareReservaVerify, appMiddlewareSucursalxAutoVerify, appMiddlewareSucursalVerify
} from "../middleware/MiddlewareVerify.js";

const getInitRoute = () => {
    const router = Router();
    /* CRUD */
    router.get("/Allalquileres", appMiddlewareAlquilerVerify, obtenerAllAlquileresController);
    router.get("/AlquileresById", appMiddlewareAlquilerVerify, obtenerAlquileresByIDController);
    router.get("/Allautomoviles", appMiddlewareAutomovilVerify, obtenerAllAutomovilesController);
    router.get("/AutomovilesById", appMiddlewareAutomovilVerify, obtenerAutomovilesByIDController);
    router.get("/Allclientes", appMiddlewareClienteVerify, obtenerAllClientesController);
    router.get("/ClientesById", appMiddlewareClienteVerify, obtenerClientesByIDController);
    router.get("/Alldevoluciones", appMiddlewareDevolucionVerify, obtenerAllDevolucionesController);
    router.get("/DevolucionesById", appMiddlewareDevolucionVerify, obtenerDevolucionesByIDController);
    router.get("/Allempleados", appMiddlewareEmpleadoVerify, obtenerAllEmpleadosController);
    router.get("/EmpleadoById", appMiddlewareEmpleadoVerify, obtenerEmpleadosByIDController);
    router.get("/Allentregas", appMiddlewareEntregasVerify, obtenerAllEntregasController);
    router.get("/EntregaById", appMiddlewareEntregasVerify, obtenerEntregasByIDController);
    router.get("/Allreservas", appMiddlewareReservaVerify, obtenerAllReservasController);
    router.get("/ReservaById", appMiddlewareReservaVerify, obtenerReservasByIDController);
    router.get("/AllSucursales", appMiddlewareSucursalVerify, obtenerAllSucursalesController );
    router.get("/SucursalById", appMiddlewareSucursalVerify, obtenerSucursalesByIDController);
    router.get("/AllSucursalAutos", appMiddlewareSucursalxAutoVerify, obtenerAllSucursalAutoController);
    router.get("/SucursalAutoById", appMiddlewareSucursalxAutoVerify, obtenerSucursalAutoByIDController );


    /* Consultas específicas */
    router.get("/AlquileresTotalCliente", appMiddlewareAlquilerVerify, obtenerAlquileresByTotalClienteController);
    router.get("/AlquileresPorDia", appMiddlewareAlquilerVerify, obtenerAlquileresPorDiaController);
    router.get("/AlquileresPorPlazos", appMiddlewareAlquilerVerify, obtenerAlquileresPorPlazosController);
    router.get("/AlquileresPorTotal", appMiddlewareAlquilerVerify, obtenerAlquileresPorTotalController);
    router.get("/AutoGrande", appMiddlewareAutomovilVerify, obtenerAutomovilGrandeController );
    router.get("/AutoMarcas", appMiddlewareAutomovilVerify, obtenerAutomovilMarcasController );
    router.get("/AutoGrandeDisponible", appMiddlewareAutomovilVerify, obtenerAutomovilDisponibleGrandeController );
    router.get("/ClientePorDocumento", appMiddlewareClienteVerify, obtenerClientesByDocumentoController );
    router.get("/ClientesPendientes", appMiddlewareClienteVerify, obtenerClientesEstadoPendienteController );
    router.get("/ClientesReservaActiva", appMiddlewareClienteVerify, obtenerClientesConReservaActivaController );
    router.get("/ClienteReservaPendiente", appMiddlewareClienteVerify, obtenerClientesConReservaPendienteController );
    router.get("/ClienteFinalizado", appMiddlewareClienteVerify, obtenerClientesServiciosEntregadosController );
    router.get("/EmpleadoVendedor", appMiddlewareEmpleadoVerify, obtenerEmpleadosVendedoresController);
    router.get("/EmpleadoGerenteAsistente", appMiddlewareEmpleadoVerify, obtenerEmpleadosGerentesOasistentesController);
    router.get("/ReservaByIdCliente", appMiddlewareReservaVerify, obtenerReservasByidClienteController);
    router.get("/ReservaByIdinfo", appMiddlewareReservaVerify, obtenerReservasByidClienteInfoController);
    router.get("/SucursalTotal", appMiddlewareSucursalVerify, obtenerSucursalPorCantidadTotalController );
    router.get("/SucursalAutoTotal", appMiddlewareSucursalxAutoVerify, obtenerSucursalAutoTotalController );
    return router;
}

export default getInitRoute;