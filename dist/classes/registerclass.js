"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const bcrypt_1 = require("bcrypt");
const database_1 = __importDefault(require("../database"));
class Register {
    constructor(username, password, cpf, email, telefone, ref_id, ip, indicadode) {
        this.username = username;
        this.password = password;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.ref_id = ref_id;
        this.ip = ip;
        this.indicadode = indicadode;
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            const passhash = yield (0, bcrypt_1.hash)(this.password, 10);
            const dataregistro = (0, moment_timezone_1.default)()
                .tz("America/Sao_Paulo")
                .format("YYYY-MM-DD HH:mm:ss");
            const res = yield database_1.default.query("INSERT INTO users SET username = ?,email = ?,password = ?,number_phone = ?,cpf = ?,ref_id = ?,ip = ?,data_registro = ?,indicadode = ?", [
                this.username,
                this.email,
                passhash,
                this.telefone,
                this.cpf,
                this.ref_id,
                this.ip,
                dataregistro,
                this.indicadode,
            ]);
            return res[0];
        });
    }
}
exports.default = Register;
