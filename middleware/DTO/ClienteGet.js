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
export class ClienteGet {
    constructor(data) {
        Object.assign(this, data);
        this.id;
        this.cliente;
        this.apellido;
        this.documento;
        this.direccion_contacto;
        this.contacto;
        this.email;
    }
}
__decorate([
    Expose({ name: 'ID_Cliente' }),
    __metadata("design:type", Number)
], ClienteGet.prototype, "id", void 0);
__decorate([
    Expose({ name: 'Nombre' }),
    __metadata("design:type", String)
], ClienteGet.prototype, "cliente", void 0);
__decorate([
    Expose({ name: 'Apellido' }),
    __metadata("design:type", String)
], ClienteGet.prototype, "apellido", void 0);
__decorate([
    Expose({ name: 'DNI' }),
    __metadata("design:type", Number)
], ClienteGet.prototype, "documento", void 0);
__decorate([
    Expose({ name: 'Direccion' }),
    __metadata("design:type", String)
], ClienteGet.prototype, "direccion_contacto", void 0);
__decorate([
    Expose({ name: 'Telefono' }),
    __metadata("design:type", Number)
], ClienteGet.prototype, "contacto", void 0);
__decorate([
    Expose({ name: 'Email' }),
    __metadata("design:type", String)
], ClienteGet.prototype, "email", void 0);
