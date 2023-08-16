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
export class Alquiler {
    constructor(data) {
        Object.assign(this, data);
        this.ID_Alquiler = 1;
        this.ID_Cliente_id = 1;
        this.ID_Automovil_id = 1;
        this.Fecha_Inicio = new Date(2023, 9, 21);
        this.Fecha_Fin = new Date(2023, 9, 23);
        this.Costo_Total = 70000;
        this.Estado = "activo";
    }
}
__decorate([
    Expose({ name: 'id' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "id" del alquiler es obligatorio` }; } }),
    __metadata("design:type", Number)
], Alquiler.prototype, "ID_Alquiler", void 0);
__decorate([
    Expose({ name: 'id_cliente' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "id_cliente" es obligatorio` }; } }),
    __metadata("design:type", Number)
], Alquiler.prototype, "ID_Cliente_id", void 0);
__decorate([
    Expose({ name: 'id_automovil' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "id_automovil" es obligatorio` }; } }),
    __metadata("design:type", Number)
], Alquiler.prototype, "ID_Automovil_id", void 0);
__decorate([
    Expose({ name: "Dia_Inicio" }),
    IsDefined({ message: () => { throw { status: 422, message: `El "Dia_Inicio" es obligatorio` }; } }),
    __metadata("design:type", Date)
], Alquiler.prototype, "Fecha_Inicio", void 0);
__decorate([
    Expose({ name: "Dia_Fin" }),
    IsDefined({ message: () => { throw { status: 422, message: `El "Dia_Fin" es obligatorio` }; } }),
    __metadata("design:type", Date)
], Alquiler.prototype, "Fecha_Fin", void 0);
__decorate([
    Expose({ name: 'costo' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "costo" del alquiler es obligatorio` }; } }),
    __metadata("design:type", Number)
], Alquiler.prototype, "Costo_Total", void 0);
__decorate([
    Expose({ name: 'estado_alquiler' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "estado_alquiler" es obligatorio` }; } }),
    __metadata("design:type", String)
], Alquiler.prototype, "Estado", void 0);
