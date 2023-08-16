var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from "class-transformer";
import { IsDefined } from "class-validator";
export class Reservas {
    constructor(data) {
        Object.assign(this, data);
        this.ID_Reserva = 1;
        this.ID_Cliente_id = 1;
        this.ID_Automovil_id = 1;
        this.Fecha_Reserva = new Date(2023, 9, 21);
        this.Fecha_Inicio = new Date(2023, 9, 21);
        this.Fecha_Fin = new Date(2023, 9, 21);
        this.Estado = "activo";
    }
}
__decorate([
    Expose({ name: 'id' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "id" de la devolucion es obligatorio` }; } }),
    __metadata("design:type", Number)
], Reservas.prototype, "ID_Reserva", void 0);
__decorate([
    Expose({ name: 'id_cliente' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "id_cliente" es obligatorio` }; } }),
    __metadata("design:type", Number)
], Reservas.prototype, "ID_Cliente_id", void 0);
__decorate([
    Expose({ name: 'id_automovil' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "id_automovil" es obligatorio` }; } }),
    __metadata("design:type", Number)
], Reservas.prototype, "ID_Automovil_id", void 0);
__decorate([
    Expose({ name: "reserva_fecha" }),
    IsDefined({ message: () => { throw { status: 422, message: `La "reserva_fecha" es un campo obligatorio` }; } }),
    __metadata("design:type", Date)
], Reservas.prototype, "Fecha_Reserva", void 0);
__decorate([
    Expose({ name: "inicio_fecha" }),
    IsDefined({ message: () => { throw { status: 422, message: `La "inicio_fecha" es un campo obligatorio` }; } }),
    __metadata("design:type", Date)
], Reservas.prototype, "Fecha_Inicio", void 0);
__decorate([
    Expose({ name: "fin_fecha" }),
    IsDefined({ message: () => { throw { status: 422, message: `La "fin_fecha" es un campo obligatorio` }; } }),
    __metadata("design:type", Date)
], Reservas.prototype, "Fecha_Fin", void 0);
__decorate([
    Expose({ name: 'combustible_retornado' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "combustible_retornado" del alquiler es obligatorio` }; } }),
    __metadata("design:type", String)
], Reservas.prototype, "Estado", void 0);
