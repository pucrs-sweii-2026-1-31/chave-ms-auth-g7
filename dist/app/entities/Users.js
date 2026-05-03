var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Gender } from "../interfaces/iUsers.js";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import Roles from "./Roles.js";
let Users = class Users {
    idUser;
    name;
    birthday;
    gender;
    email;
    roles;
};
__decorate([
    PrimaryGeneratedColumn('increment', { name: 'id_user' }),
    __metadata("design:type", Number)
], Users.prototype, "idUser", void 0);
__decorate([
    Column({ name: 'name', nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    Column({ name: 'birthday', type: "date", nullable: false }),
    __metadata("design:type", Date)
], Users.prototype, "birthday", void 0);
__decorate([
    Column({ name: 'gender', type: "enum", enum: Gender, nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "gender", void 0);
__decorate([
    Column({ name: 'email', nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    ManyToMany(() => Roles, (role) => role.users),
    JoinTable({
        name: "users_roles",
        joinColumn: {
            name: "id_user",
            referencedColumnName: "idUser"
        },
        inverseJoinColumn: {
            name: "id_role",
            referencedColumnName: "idRole"
        }
    }),
    __metadata("design:type", Array)
], Users.prototype, "roles", void 0);
Users = __decorate([
    Entity('users')
], Users);
export default Users;
//# sourceMappingURL=Users.js.map