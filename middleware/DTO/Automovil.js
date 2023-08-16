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
    Expose({ name: 'id_auto' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "id_auto" del automovil es obligatorio` }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "ID_Automovil", void 0);
__decorate([
    Expose({ name: 'marca_auto' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "marca_auto" del automovil es obligatorio` }; } }),
    __metadata("design:type", String)
], Automovil.prototype, "Marca", void 0);
__decorate([
    Expose({ name: 'modelo_auto' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "modelo_auto" del automovil es obligatorio` }; } }),
    __metadata("design:type", String)
], Automovil.prototype, "Modelo", void 0);
__decorate([
    Expose({ name: 'year_auto' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "year_auto" del automovil es obligatorio` }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "Anio", void 0);
__decorate([
    Expose({ name: 'tipo_auto' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "tipo_auto" del automovil es obligatorio` }; } }),
    __metadata("design:type", String)
], Automovil.prototype, "Tipo", void 0);
__decorate([
    Expose({ name: 'capacidad_auto' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "capacidad_auto" del automovil es obligatorio` }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "Capacidad", void 0);
__decorate([
    Expose({ name: 'costo_dia' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "costo_dia" del automovil es obligatorio` }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "Precio_Diario", void 0);
