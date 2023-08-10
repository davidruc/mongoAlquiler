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
export class Automovil {
    constructor(data) {
        Object.assign(this, data);
        this.ID_Automovil = 1;
        this.Marca = "Chevrolet";
        this.Modelo = "Picanto";
        this.Anio = 2020;
        this.Tipo = "Automovil";
        this.Capacidad = 5;
        this.Precio_Diario = 70000;
    }
}
__decorate([
    Expose({ name: 'id' }),
    IsDefined({ message: () => { throw { status: 422, message: `El id del automovil es obligatorio` }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "ID_Automovil", void 0);
__decorate([
    Expose({ name: 'marca_automovil' }),
    IsDefined({ message: () => { throw { status: 422, message: `El marca_automovil del automovil es obligatorio` }; } }),
    __metadata("design:type", String)
], Automovil.prototype, "Marca", void 0);
__decorate([
    Expose({ name: 'modelo_automovil' }),
    IsDefined({ message: () => { throw { status: 422, message: `El modelo_automovil del automovil es obligatorio` }; } }),
    __metadata("design:type", String)
], Automovil.prototype, "Modelo", void 0);
__decorate([
    Expose({ name: 'year' }),
    IsDefined({ message: () => { throw { status: 422, message: `El año del automovil es obligatorio` }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "Anio", void 0);
__decorate([
    Expose({ name: 'tipo' }),
    IsDefined({ message: () => { throw { status: 422, message: `El tipo del automovil es obligatorio` }; } }),
    __metadata("design:type", String)
], Automovil.prototype, "Tipo", void 0);
__decorate([
    Expose({ name: 'cupo' }),
    IsDefined({ message: () => { throw { status: 422, message: `El cupo del automovil es obligatorio` }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "Capacidad", void 0);
__decorate([
    Expose({ name: 'valor_dia' }),
    IsDefined({ message: () => { throw { status: 422, message: `El valor_dia del automovil es obligatorio` }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "Precio_Diario", void 0);
