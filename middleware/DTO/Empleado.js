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
export class Empleado {
    constructor(data) {
        Object.assign(this, data);
        this.ID_Empleado = 1;
        this.Nombre = "pedro";
        this.Apellido = "perez";
        this.DNI = 23232344324;
        this.Direccion = "cra 22#23";
        this.Telefono = 3231234233;
        this.Cargo = "gerente interino";
    }
}
__decorate([
    Expose({ name: 'id' }),
    IsDefined({ message: () => { throw { status: 422, message: `El id del empleado es obligatorio` }; } }),
    __metadata("design:type", Number)
], Empleado.prototype, "ID_Empleado", void 0);
__decorate([
    Expose({ name: 'empleado' }),
    IsDefined({ message: () => { throw { status: 422, message: `El nombre del "empleado" es obligatorio` }; } }),
    __metadata("design:type", String)
], Empleado.prototype, "Nombre", void 0);
__decorate([
    Expose({ name: 'apellido' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "apellido" del empleado es obligatorio` }; } }),
    __metadata("design:type", String)
], Empleado.prototype, "Apellido", void 0);
__decorate([
    Expose({ name: 'documento' }),
    IsDefined({ message: () => { throw { status: 422, message: `El "documento" del empleado es obligatorio` }; } }),
    __metadata("design:type", Number)
], Empleado.prototype, "DNI", void 0);
__decorate([
    Expose({ name: 'direccion_contacto' }),
    IsDefined({ message: () => { throw { status: 422, message: `La "direccion_contacto" del empleado es obligatorio` }; } }),
    __metadata("design:type", String)
], Empleado.prototype, "Direccion", void 0);
__decorate([
    Expose({ name: 'contacto' }),
    IsDefined({ message: () => { throw { status: 422, message: `El telefono de "contacto" del empleado es obligatorio` }; } }),
    __metadata("design:type", Number)
], Empleado.prototype, "Telefono", void 0);
__decorate([
    Expose({ name: 'email' }),
    IsDefined({ message: () => { throw { status: 422, message: `El telefono de "contacto" del empleado es obligatorio` }; } }),
    __metadata("design:type", String)
], Empleado.prototype, "Cargo", void 0);
