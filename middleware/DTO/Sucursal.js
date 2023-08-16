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
export class Sucursal {
    constructor(data) {
        Object.assign(this, data);
        this.ID_Sucursal = 1;
        this.Nombre = "pedro";
        this.Direccion = "cra 22#23";
        this.Telefono = 3231234233;
    }
}
__decorate([
    Expose({ name: 'id' }),
    IsDefined({ message: () => { throw { status: 422, message: `El id de la sucursal es obligatorio` }; } }),
    __metadata("design:type", Number)
], Sucursal.prototype, "ID_Sucursal", void 0);
__decorate([
    Expose({ name: 'sucursal' }),
    IsDefined({ message: () => { throw { status: 422, message: `El nombre de la "sucursal" es obligatorio` }; } }),
    __metadata("design:type", String)
], Sucursal.prototype, "Nombre", void 0);
__decorate([
    Expose({ name: 'ubicacion' }),
    IsDefined({ message: () => { throw { status: 422, message: `La "ubicacion" de la sucursal es obligatorio` }; } }),
    __metadata("design:type", String)
], Sucursal.prototype, "Direccion", void 0);
__decorate([
    Expose({ name: 'contacto' }),
    IsDefined({ message: () => { throw { status: 422, message: `El telefono de "contacto" de la sucursal es obligatorio` }; } }),
    __metadata("design:type", Number)
], Sucursal.prototype, "Telefono", void 0);
