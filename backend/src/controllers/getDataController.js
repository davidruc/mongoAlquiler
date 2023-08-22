import { 
    obtenerAllAlquileres,
    obtenerAlquileresByID,
    obtenerAlquileresByTotalCliente,
    obtenerAlquileresPorDia,
    obtenerAlquileresPorPlazos,
    obtenerAlquileresPorTotal,
    obtenerAllAutomoviles,
    obtenerAutomovilesByID,
    obtenerAllClientes,
    obtenerClientesByID,
    obtenerAllDevoluciones,
    obtenerDevolucionesByID,
    obtenerAllEmpleados,
    obtenerEmpleadosByID,
    obtenerAllEntregas,
    obtenerEntregasByID,
    obtenerAllReservas,
    obtenerReservasByID,
    obtenerAllSucursales,
    obtenerSucursalesByID,
    obtenerAllSucursalAuto,
    obtenerSucursalAutoByID,
    obtenerAutomovilGrande,
    obtenerAutomovilMarcas,
    obtenerAutomovilDisponibleGrande,
    obtenerClientesByDocumento,
    obtenerClientesEstadoPendiente,
    obtenerClientesConReservaActiva,
    obtenerClientesConReservaPendiente,
    obtenerClientesServiciosEntregados,
    obtenerEmpleadosVendedores,
    obtenerEmpleadosGerentesOasistentes,
    obtenerReservasByidCliente,
    obtenerReservasByidClienteInfo,
    obtenerSucursalPorCantidadTotal,
    obtenerSucursalAutoTotal,

} from "../services/getServices.js";

const obtenerAllAlquileresController = async (req, res, next)=>{
    try {
        const alquiler = await obtenerAllAlquileres()
        console.log(alquiler);
        res.status(200).send(alquiler)
    } catch (error) {
        res.status(500).send(error);
    }
};
const obtenerAlquileresByIDController = async (req, res, next)=>{
    try {
        const {id} = req.query;
        const alquiler = await obtenerAlquileresByID(id)
        res.status(200).send(alquiler)
    } catch (error) {
        res.status(500).send(error);
    }
};
const obtenerAllAutomovilesController = async(req, res, next) =>{
    try {
        const automovil = await obtenerAllAutomoviles() 
        res.status(200).send(automovil)
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerAutomovilesByIDController = async(req, res, next) =>{
    try {
        const {id} = req.query;
        const automovil = await obtenerAutomovilesByID(id); 
        res.status(200).send(automovil)
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerAllClientesController = async(req, res, next) =>{
    try {
        const cliente = await obtenerAllClientes(); 
        res.status(200).send(cliente)
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerClientesByIDController = async(req, res, next) =>{
    try {
        const {id} = req.query;
        const cliente = await obtenerClientesByID(id); 
        res.status(200).send(cliente);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerAllDevolucionesController = async(req, res, next) =>{
    try {
        const devoluciones = await obtenerAllDevoluciones() 
        res.status(200).send(devoluciones)
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerDevolucionesByIDController = async(req, res, next) =>{
    try {
        const {id} = req.query;
        const devoluciones = await obtenerDevolucionesByID(id); 
        res.status(200).send(devoluciones);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerAllEmpleadosController = async(req, res, next) =>{
    try {
        const empleado = await obtenerAllEmpleados(); 
        res.status(200).send(empleado);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerEmpleadosByIDController = async(req, res, next) =>{
    try {
        const {id} = req.query;
        const empleado = await obtenerEmpleadosByID(id)
        res.status(200).send(empleado)
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerAllEntregasController = async(req, res, next) =>{
    try {
        const entregas = await obtenerAllEntregas();
        res.status(200).send(entregas)
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerEntregasByIDController = async(req, res, next) =>{
    try {
        const {id} = req.query;
        const entregas= await obtenerEntregasByID(id);
        res.status(200).send(entregas)
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerAllReservasController = async(req, res, next) =>{
    try {
        const reservas = await obtenerAllReservas();
        res.status(200).send(reservas);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerReservasByIDController = async(req, res, next) =>{
    try {
        const {id} = req.query;
        const reservas = await obtenerReservasByID(id);
        res.status(200).send(reservas);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerAllSucursalesController = async(req, res, next) =>{
    try {
        const sucursal = await obtenerAllSucursales();
        res.status(200).send(sucursal)
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerSucursalesByIDController = async(req, res, next) =>{
    try {
        const {id} = req.query;
        const sucursal = await obtenerSucursalesByID(id);
        res.status(200).send(sucursal);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerAllSucursalAutoController = async(req, res, next) =>{
    try {
        const sucrusalAuto = await obtenerAllSucursalAuto();
        res.status(200).send(sucrusalAuto);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerSucursalAutoByIDController = async(req, res, next) =>{
    try {
        const {id} = req.query;
        const sucrusalAuto = await obtenerSucursalAutoByID(id);
        res.status(200).send(sucrusalAuto);
    } catch (error) {
        res.status(500).send(error);
    }
}

/* CONSULTAS */
const obtenerAlquileresByTotalClienteController = async (req, res, next)=>{
    try {
        const {idAlquiler} = req.query;
        const alquiler = await obtenerAlquileresByTotalCliente(idAlquiler);
        res.status(200).send(alquiler);
    } catch (error) {
        res.status(500).send(error);
    }
};
const obtenerAlquileresPorDiaController = async (req, res, next)=>{
    try {
        const alquiler = await obtenerAlquileresPorDia()
        res.status(200).send(alquiler)
    } catch (error) {
        res.status(500).send(error);
    }
};
const obtenerAlquileresPorPlazosController = async (req, res, next)=>{
    try {
        const alquiler = await obtenerAlquileresPorPlazos()
        res.status(200).send(alquiler)
    } catch (error) {
        res.status(500).send(error);
    }
};
const obtenerAlquileresPorTotalController = async (req, res, next)=>{
    try {
        const alquiler = await obtenerAlquileresPorTotal()
        res.status(200).send(alquiler)
    } catch (error) {
        res.status(500).send(error);
    }
};
const obtenerAutomovilGrandeController = async(req, res, next) =>{
    try {
        const automovil = await  obtenerAutomovilGrande();
        res.status(200).send(automovil);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerAutomovilMarcasController = async(req, res, next) =>{
    try {
        const automovil = await obtenerAutomovilMarcas();
        res.status(200).send(automovil);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerAutomovilDisponibleGrandeController = async(req, res, next) =>{
    try {
        const automovil = await obtenerAutomovilDisponibleGrande();
        res.status(200).send(automovil);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerClientesByDocumentoController = async(req, res, next) =>{
    try {
        const {doc} = req.query;
        const cliente = await obtenerClientesByDocumento(doc);
        res.status(200).send(cliente);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerClientesEstadoPendienteController = async(req, res, next) =>{
    try {
        const {id} = req.query;
        const cliente = await obtenerClientesEstadoPendiente(id)
        res.status(200).send(cliente)
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerClientesConReservaActivaController = async(req, res, next) =>{
    try {
        
        const cliente = await obtenerClientesConReservaActiva();
        res.status(200).send(cliente);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerClientesConReservaPendienteController = async(req, res, next) =>{
    try {
        const cliente = await obtenerClientesConReservaPendiente();
        res.status(200).send(cliente);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerClientesServiciosEntregadosController = async(req, res, next) =>{
    try {
        const cliente = await obtenerClientesServiciosEntregados();
        res.status(200).send(cliente);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerEmpleadosVendedoresController = async(req, res, next) =>{
    try {
        const empleado = await obtenerEmpleadosVendedores();
        res.status(200).send(empleado);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerEmpleadosGerentesOasistentesController = async(req, res, next) =>{
    try {
        const empleado = await obtenerEmpleadosGerentesOasistentes();
        res.status(200).send(empleado);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerReservasByidClienteController = async(req, res, next) =>{
    try {
        const {id} = req.query;
        const reserva = await obtenerReservasByidCliente(id);
        res.status(200).send(reserva);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerReservasByidClienteInfoController = async(req, res, next) =>{
    try {
        const {id} = req.query;
        const reserva = await obtenerReservasByidClienteInfo(id);
        res.status(200).send(reserva);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerSucursalPorCantidadTotalController = async(req, res, next) =>{
    try {
        const sucursal = await obtenerSucursalPorCantidadTotal();
        res.status(200).send(sucursal);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerSucursalAutoTotalController = async(req, res, next) =>{
    try {
        const sucrusalAuto = await obtenerSucursalAutoTotal(); 
        res.status(200).send(sucrusalAuto)
    } catch (error) {
        res.status(500).send(error);
    }
}

export {
    obtenerAllAlquileresController,
    obtenerAlquileresByIDController,
    obtenerAlquileresByTotalClienteController,
    obtenerAlquileresPorDiaController,
    obtenerAlquileresPorPlazosController,
    obtenerAlquileresPorTotalController,
    obtenerAllAutomovilesController,
    obtenerAutomovilesByIDController,
    obtenerAllClientesController,
    obtenerClientesByIDController,
    obtenerAllDevolucionesController,
    obtenerDevolucionesByIDController,
    obtenerAllEmpleadosController,
    obtenerEmpleadosByIDController,
    obtenerAllEntregasController,
    obtenerEntregasByIDController,
    obtenerAllReservasController,
    obtenerReservasByIDController,
    obtenerAllSucursalesController,
    obtenerSucursalesByIDController,
    obtenerAllSucursalAutoController,
    obtenerSucursalAutoByIDController,
    obtenerAutomovilGrandeController,
    obtenerAutomovilMarcasController,
    obtenerAutomovilDisponibleGrandeController,
    obtenerClientesByDocumentoController,
    obtenerClientesEstadoPendienteController,
    obtenerClientesConReservaActivaController,
    obtenerClientesConReservaPendienteController,
    obtenerClientesServiciosEntregadosController,
    obtenerEmpleadosVendedoresController,
    obtenerEmpleadosGerentesOasistentesController,
    obtenerReservasByidClienteController,
    obtenerReservasByidClienteInfoController,
    obtenerSucursalPorCantidadTotalController,
    obtenerSucursalAutoTotalController
}