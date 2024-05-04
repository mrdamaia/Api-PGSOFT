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
    getuserbyatk(atk) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query(`SELECT * FROM users WHERE atk= ?`, [atk]);
            return res[0];
        });
    },
    attsaldobyatk(atk, novosaldo) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query(`UPDATE users SET saldo = '${novosaldo}' WHERE atk= '${atk}'`);
            return res[0];
        });
    },
    atualizarapostado(atk, bet) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getuserbyatk(atk);
            const apostado = user[0].valorapostado;
            const novoapostado = apostado + bet;
            const res = yield database_1.default.query(`UPDATE users SET valorapostado = '${novoapostado}' WHERE atk='${atk}'`);
            return res[0];
        });
    },
    atualizardebitado(atk, bet) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getuserbyatk(atk);
            const valordebitado = user[0].valordebitado;
            const novordebitado = valordebitado + bet;
            const res = yield database_1.default.query(`UPDATE users SET valordebitado = '${novordebitado}' WHERE atk='${atk}'`);
            return res[0];
        });
    },
    atualizarganho(atk, ganho) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getuserbyatk(atk);
            const valorganho = user[0].valorganho;
            const novodeganho = valorganho + ganho;
            const res = yield database_1.default.query(`UPDATE users SET valorganho = '${novodeganho}' WHERE atk='${atk}'`);
            return res[0];
        });
    },
    getcall(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query("SELECT * FROM calls WHERE iduser = ?", [id]);
            return res[0];
        });
    },
    completarcallid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const newstatus = "completed";
            const res = yield database_1.default.query("UPDATE calls SET status = ? WHERE id = ?", [newstatus, id]);
            return res[0];
        });
    },
    savejsonspin(id, json) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query("UPDATE fortuneplayerjson SET JSON = ? WHERE id = ?", [json, id]);
            return res[0];
        });
    },
    getjsontiger(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query("SELECT * FROM fortuneplayerjson WHERE id=?", [id]);
            return res[0];
        });
    },
    determinarResultado(probabilidadeGanho, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultadoAleatorio = Math.random();
            const callpending = yield this.getcall(id);
            if (callpending.length > 0 && callpending[0].status === "pending") {
                return {
                    result: "bonus",
                    json: callpending[0].jsonname,
                    steps: callpending[0].step,
                    idcall: callpending[0].id,
                };
            }
            if (resultadoAleatorio < probabilidadeGanho) {
                return { result: "ganho" };
            }
            else {
                return { result: "perda" };
            }
        });
    },
    calcularganho(valorAposta, saldoatual, token) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield this.getuserbyatk(token);
            let probabilidadeGanho = 0.1;
            if (user[0].rtp >= 0 && user[0].rtp <= 30) {
                probabilidadeGanho = 0.3;
            }
            if (valorAposta >= 4) {
                probabilidadeGanho = 0.1;
            }
            console.log("RTP ATUAL DO JOGADOR " + user[0].rtp);
            console.log("PROBABILIDADE DE GANHO ATUAL " + probabilidadeGanho);
            const resultado = this.determinarResultado(probabilidadeGanho, user[0].id);
            return resultado;
        });
    },
};
