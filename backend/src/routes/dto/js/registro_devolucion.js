var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";
export class Devoluciones {
    constructor(data) {
        Object.assign(this, data);
        this.ID_Registro = 1;
        this.ID_Alquiler_id = 1;
        this.ID_Empleado_id = 1;
        this.Fecha_Devolucion = new Date(2023, 9, 21);
        this.Combustible_Devuelto = 70000;
        this.Kilometraje_Devuelto = 30000;
        this.Monto_Adicional = 10000;
    }
}
__decorate([
    Expose({ name: 'id' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "id" de la devolucion es obligatorio` }; } }),
    __metadata("design:type", Number)
], Devoluciones.prototype, "ID_Registro", void 0);
__decorate([
    Expose({ name: 'id_alquiler' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "id_alquiler" es obligatorio` }; } }),
    __metadata("design:type", Number)
], Devoluciones.prototype, "ID_Alquiler_id", void 0);
__decorate([
    Expose({ name: 'id_empleado' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "id_empleado" es obligatorio` }; } }),
    __metadata("design:type", Number)
], Devoluciones.prototype, "ID_Empleado_id", void 0);
__decorate([
    Expose({ name: "fecha_entrega" }),
    IsDefined({ message: () => { throw { status: 422, message: `La "fecha_entrega" es un campo obligatorio` }; } }),
    __metadata("design:type", Date)
], Devoluciones.prototype, "Fecha_Devolucion", void 0);
__decorate([
    Expose({ name: 'combustible_retornado' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "combustible_retornado" del alquiler es obligatorio` }; } }),
    __metadata("design:type", Number)
], Devoluciones.prototype, "Combustible_Devuelto", void 0);
__decorate([
    Expose({ name: 'kilometraje_retornado' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "kilometraje_retornado" del alquiler es obligatorio` }; } }),
    __metadata("design:type", Number)
], Devoluciones.prototype, "Kilometraje_Devuelto", void 0);
__decorate([
    Expose({ name: 'costo_adicional' }),
    Transform(({ value }) => { if (value)
        return value;
    else
        0; }),
    __metadata("design:type", Number)
], Devoluciones.prototype, "Monto_Adicional", void 0);
