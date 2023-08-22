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
export class Entregas {
    constructor(data) {
        Object.assign(this, data);
        this.ID_Registro = 1;
        this.ID_Alquiler_id = 1;
        this.ID_Empleado_id = 1;
        this.Fecha_Entrega = new Date(2023, 9, 21);
        this.Combustible_Entregado = 70000;
        this.Kilometraje_Entregado = 30000;
    }
}
__decorate([
    Expose({ name: 'id' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "id" de la devolucion es obligatorio` }; } }),
    __metadata("design:type", Number)
], Entregas.prototype, "ID_Registro", void 0);
__decorate([
    Expose({ name: 'id_alquiler' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "id_alquiler" es obligatorio` }; } }),
    __metadata("design:type", Number)
], Entregas.prototype, "ID_Alquiler_id", void 0);
__decorate([
    Expose({ name: 'id_empleado' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "id_empleado" es obligatorio` }; } }),
    __metadata("design:type", Number)
], Entregas.prototype, "ID_Empleado_id", void 0);
__decorate([
    Expose({ name: "fecha_inicio" }),
    IsDefined({ message: () => { throw { status: 422, message: `La "fecha_inicio" es un campo obligatorio` }; } }),
    __metadata("design:type", Date)
], Entregas.prototype, "Fecha_Entrega", void 0);
__decorate([
    Expose({ name: 'combustible_actual' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "combustible_actual" del alquiler es obligatorio` }; } }),
    __metadata("design:type", Number)
], Entregas.prototype, "Combustible_Entregado", void 0);
__decorate([
    Expose({ name: 'Kilometraje_actual' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "Kilometraje_actual" del alquiler es obligatorio` }; } }),
    __metadata("design:type", Number)
], Entregas.prototype, "Kilometraje_Entregado", void 0);
