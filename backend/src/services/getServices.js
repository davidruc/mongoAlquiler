import { Alquiler } from "../entities/alquiler.js";
import { Automovil } from "../entities/automovil.js";
import { Cliente } from "../entities/cliente.js";
import { Devoluciones } from "../entities/devoluciones.js";
import { Empleados } from "../entities/empleados.js";
import { Entregas } from "../entities/entregas.js";
import { Reservas } from "../entities/reservas.js";
import { Sucursal } from "../entities/sucursal.js";
import { sucursalAuto } from "../entities/sucursal_auto.js";


/* CRUDS */
const obtenerAllAlquileres = async ()=>{
    const alquiler = new Alquiler();
    return await alquiler.getAllAlquileres();
}
const obtenerAlquileresByID = async (id)=>{
    const alquiler = new Alquiler();
    return await alquiler.getAlquileresById(id);
}
const obtenerAllAutomoviles = async ()=>{
    const automovil = new Automovil();
    return await automovil.getAllautomoviles();
}
const obtenerAutomovilesByID = async (id)=>{
    const automovil = new Automovil();
    return await automovil.getAutomovilesByID(id);
}
const obtenerAllClientes = async()=>{
    const cliente = new Cliente();
    return await cliente.getAllClientes();
}
const obtenerClientesByID = async (id)=>{
    const cliente = new Cliente();
    return await cliente.getClientesByID(id);
}
const obtenerAllDevoluciones = async ()=>{
    const devolucion = new Devoluciones();
    return await devolucion.getAllDevoluciones()
}
const obtenerDevolucionesByID = async (id)=>{
    const devolucion = new Devoluciones();
    return await devolucion.getDevolucionByID(id)
}
const obtenerAllEmpleados = async ()=>{
    const empleado = new Empleados();
    return await empleado.getAllEmpleados()
}
const obtenerEmpleadosByID = async (id)=>{
    const empleado = new Empleados();
    return await empleado.getEmpleadosByID(id)
}
const obtenerAllEntregas = async ()=>{
    const entrega = new Entregas();
    return await entrega.getAllEntregas();
}
const obtenerEntregasByID = async (id)=>{
    const entrega = new Entregas();
    return await entrega.getEntregasByID(id);
}
const obtenerAllReservas = async ()=>{
    const reserva = new Reservas();
    return await reserva.getAllReservas();
}
const obtenerReservasByID = async (id)=>{
    const reserva = new Reservas();
    return await reserva.getReservasByID(id);
}
const obtenerAllSucursales = async ()=>{
    const sucursal = new Sucursal();
    return await sucursal.getAllSucursales();
}
const obtenerSucursalesByID = async (id)=>{
    const sucursal = new Sucursal();
    return await sucursal.getSucursalByID(id);
}
const obtenerAllSucursalAuto = async ()=>{
    const sucursal_auto = new sucursalAuto();
    return await sucursal_auto.getAllSucursalAuto()
}
const obtenerSucursalAutoByID = async (id)=>{
    const sucursal_auto = new sucursalAuto();
    return await sucursal_auto.getSucursalAutoByID(id)
}

/* CONSULTAS */
const obtenerAlquileresByTotalCliente = async ()=>{
    const alquiler = new Alquiler();
    return await alquiler.getAlquileresByTotalCliente();
}
const obtenerAlquileresPorDia = async()=>{
    const alquiler = new Alquiler();
    return await alquiler.getAlquileresPorDia();
}
const obtenerAlquileresPorPlazos = async()=>{
    const alquiler = new Alquiler();
    return await alquiler.getAlquileresPorPlazos();
}
const obtenerAlquileresPorTotal = async()=>{
    const alquiler = new Alquiler();
    return await alquiler.getAlquileresPorTotal();
}
const obtenerAutomovilGrande = async()=>{
    const automovil = new Automovil();
    return await automovil.getAutomovilGrande();
}
const obtenerAutomovilMarcas = async()=>{
    const automovil = new Automovil();
    return await automovil.getAutomovilMarcas();
}
const obtenerAutomovilDisponibleGrande = async()=>{
    const automovil = new Automovil();
    return await automovil.getAutomovilDisponibleGrande();
} 
const obtenerClientesByDocumento = async(doc)=>{
    const cliente = new Cliente();
    return await cliente.getClientesByDocumento(doc);
}
const obtenerClientesEstadoPendiente = async(id)=>{
    const client = new Cliente();
    return await client.getClientesByIDEstadoPendiente(id);
}
const obtenerClientesConReservaActiva = async()=>{
    const cliente = new Cliente(); 
    return await cliente.getClientesConReservaActiva();
}
const obtenerClientesConReservaPendiente = async()=>{
    const cliente = new Cliente();
    return await cliente.getClientesByIDEstadoPendiente();
}
const obtenerClientesServiciosEntregados = async()=>{
    const cliente = new Cliente();
    return await cliente.getClientesServiciosEntregados();
}
const obtenerEmpleadosVendedores = async ()=>{
    const empleado = new Empleados();
    return await empleado.getEmpleadoVendedor()
}
const obtenerEmpleadosGerentesOasistentes = async ()=>{
    const empleado = new Empleados();
    return await empleado.getEmpleadoGerenteOAsistente()
}
const obtenerReservasByidCliente = async (id)=>{
    const reserva = new Reservas();
    return await reserva.getReservasByidCliente(id);
}
const obtenerReservasByidClienteInfo = async (id)=>{
    const reserva = new Reservas();
    return await reserva.getReservasByIDClientInfo(id);
}
const obtenerSucursalPorCantidadTotal = async ()=>{
    const sucursal = new Sucursal();
    return await sucursal.getSucursalPorCantidadTotal();
}
const obtenerSucursalAutoTotal = async ()=>{
    const sucursal_auto = new sucursalAuto();
    return await sucursal_auto.getSucursalAutoTotal()
}
export {
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

}