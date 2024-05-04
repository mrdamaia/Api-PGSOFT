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
const database_1 = __importDefault(require("../database"));
exports.default = {
    getuserbytoken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query(`SELECT * FROM users WHERE token= ?`, [token]);
            return res[0];
        });
    },
    getuserbyid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query("SELECT * FROM users WHERE id = ?", [id]);
            return res[0];
        });
    },
    getuserbyatk(atk) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query(`SELECT * FROM users WHERE atk= ?`, [atk]);
            return res[0];
        });
    },
    getcall(id, game_code) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query("SELECT * FROM calls WHERE iduser = ? and status = 'pending' and gamecode= ?", [id, game_code]);
            return res[0];
        });
    },
    getagentbyid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query("SELECT * FROM agents WHERE id = ?", [id]);
            return res[0];
        });
    },
    getcallbyid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query("SELECT * FROM calls WHERE id = ?", [id]);
            return res[0];
        });
    },
    updatertp(token, rtp) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query("UPDATE users SET rtp = ? WHERE token = ?", [rtp, token]);
            return res[0];
        });
    },
    addcall(gamecode, iduser, json) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query("INSERT INTO calls (iduser,gamecode,jsonname,bycall) VALUES (?,?,?,'system')", [iduser, gamecode, json]);
            return res[0];
        });
    },
    updatestepscall(idcall, steps) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query("UPDATE calls SET steps = ? WHERE id=?", [steps, idcall]);
            return res[0];
        });
    },
    subtrairstepscall(idcall) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query("SELECT steps from calls WHERE id=?", [idcall]);
            const call = res[0];
            const steps = call[0].steps;
            const newsteps = steps - 1;
            const res1 = yield database_1.default.query("UPDATE calls SET steps = ? WHERE id = ?", [newsteps, idcall]);
            return res1[0];
        });
    },
    completecall(idcall) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query('UPDATE calls SET status = "completed" WHERE id= ?', [idcall]);
            return res[0];
        });
    },
    adicionarZeroAntes(numero) {
        return __awaiter(this, void 0, void 0, function* () {
            return Number("0." + numero.toString());
        });
    },
    determinarResultado(probabilidadeGanho, probabilidadebonus, id, gamecode) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultadoAleatorio = Math.random();
            const callpending = yield this.getcall(id, gamecode);
            let numeroAleatorio = 0;
            if (callpending.length > 0 && callpending[0].status === "pending" && callpending[0].gamecode === `${gamecode}`) {
                return {
                    result: "bonus",
                    gamecode: gamecode,
                    json: callpending[0].jsonname,
                    idcall: callpending[0].id,
                };
            }
            if (resultadoAleatorio < probabilidadeGanho) {
                if (resultadoAleatorio < probabilidadebonus) {
                    const user = yield this.getuserbyid(id);
                    if (user[0].isinfluencer === 1) {
                        numeroAleatorio = Math.floor(Math.random() * 6) + 1;
                        yield this.addcall(gamecode, id, numeroAleatorio);
                    }
                    else {
                        numeroAleatorio = Math.floor(Math.random() * (12 - 7 + 1)) + 7;
                        yield this.addcall(gamecode, id, numeroAleatorio);
                    }
                    return { result: "ganho" };
                }
                else {
                    return { result: "ganho" };
                }
            }
            else {
                return { result: "perda" };
            }
        });
    },
    calcularganho(valorAposta, saldoatual, token, gamecode) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield this.getuserbyatk(token);
            var agent = yield this.getagentbyid(user[0].agentid);
            let probabilidadeGanho = yield this.adicionarZeroAntes(agent[0].probganho);
            let probabilidadebonus = yield this.adicionarZeroAntes(agent[0].probbonus);
            if (user[0].rtp >= 0 && user[0].rtp <= 30 && user[0].isinfluencer === 0) {
                probabilidadeGanho = yield this.adicionarZeroAntes(agent[0].probganhortp);
            }
            if (saldoatual >= 100) {
                probabilidadeGanho = yield this.adicionarZeroAntes(agent[0].probganhosaldo);
            }
            if (valorAposta >= 2) {
                probabilidadeGanho = yield this.adicionarZeroAntes(agent[0].probganhoaposta);
            }
            if (user[0].isinfluencer === 1) {
                probabilidadeGanho = yield this.adicionarZeroAntes(agent[0].probganhoinfluencer);
                probabilidadebonus = yield this.adicionarZeroAntes(agent[0].probbonusinfluencer);
            }
            console.log("PROBABILIDADE DE GANHO ATUAL " + probabilidadeGanho);
            console.log("PROBABILIDADE DE BONUS ATUAL " + probabilidadebonus);
            const resultado = this.determinarResultado(probabilidadeGanho, probabilidadebonus, user[0].id, gamecode);
            return resultado;
        });
    },
};
