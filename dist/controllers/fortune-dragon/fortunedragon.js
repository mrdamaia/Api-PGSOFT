"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("../../logger"));
const crypto = __importStar(require("crypto"));
const uuid_1 = require("uuid");
const moment_1 = __importDefault(require("moment"));
const allfunctions_1 = __importDefault(require("../../functions/allfunctions"));
const apicontroller_1 = __importDefault(require("../apicontroller"));
const serverEvents_1 = require("../../serverEvents");
require("dotenv/config");
const fortunedragonfunctions_1 = __importDefault(require("../../functions/fortune-dragon/fortunedragonfunctions"));
const notcashdragon_1 = __importDefault(require("../../jsons/fortune-dragon/notcashdragon"));
const linhaperdadragon_1 = __importDefault(require("../../jsons/fortune-dragon/linhaperdadragon"));
const linhaganhodragon_1 = __importDefault(require("../../jsons/fortune-dragon/linhaganhodragon"));
const linhabonusdragon_1 = __importDefault(require("../../jsons/fortune-dragon/linhabonusdragon"));
exports.default = {
    getdragon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.body.atk;
                const user = yield fortunedragonfunctions_1.default.getuserbyatk(token);
                const jsonprimay = yield fortunedragonfunctions_1.default.getjsondragon(user[0].id);
                if (jsonprimay.length === 0) {
                    yield fortunedragonfunctions_1.default.createjsondragon(user[0].id);
                }
                const json = yield fortunedragonfunctions_1.default.getjsondragon(user[0].id);
                const jsonformatado = yield JSON.parse(json[0].json);
                res.send({
                    dt: {
                        fb: { is: false, bm: 5, t: 0.15 },
                        wt: { mw: 5.0, bw: 20.0, mgw: 35.0, smgw: 50.0 },
                        maxwm: 2500,
                        cs: [0.08, 0.8, 3.0, 10.0],
                        ml: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        mxl: 5,
                        bl: user[0].saldo,
                        inwe: false,
                        iuwe: false,
                        ls: {
                            si: jsonformatado.dt.si,
                        },
                        cc: "BRL",
                    },
                    err: null,
                });
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    },
    spin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let cs = req.body.cs;
            let ml = req.body.ml;
            const token = req.body.atk;
            function lwchange(json1, json2, cs, ml) {
                return __awaiter(this, void 0, void 0, function* () {
                    for (let chave in json1) {
                        if (json1.hasOwnProperty(chave)) {
                            const valor = json1[chave];
                            const ganho = cs * ml * parseFloat(valor);
                            // Verifica se a chave existe no segundo JSON
                            for (let chave2 in json2) {
                                if (json2.hasOwnProperty(chave2)) {
                                    // Altera o valor correspondente no segundo JSON
                                    json2[chave] = ganho;
                                }
                            }
                        }
                    }
                });
            }
            function countrwsp(json) {
                return __awaiter(this, void 0, void 0, function* () {
                    let multplicador = 0;
                    for (let i = 1; i <= 10; i++) {
                        const chave = i.toString();
                        if (json.hasOwnProperty(chave)) {
                            multplicador = multplicador + parseFloat(json[chave]);
                        }
                    }
                    return multplicador;
                });
            }
            function gerarNumeroUnico() {
                return __awaiter(this, void 0, void 0, function* () {
                    return crypto.randomBytes(8).toString("hex");
                });
            }
            function verificarValores(json) {
                return __awaiter(this, void 0, void 0, function* () {
                    const numerosVerificados = [];
                    // Iterar sobre os índices em 'mt'
                    for (const chaveMT in json.mf.mt) {
                        // Verificar se o valor correspondente em 'ms' é verdadeiro
                        const valorMS = json.mf.ms[chaveMT];
                        if (json.mf.ms[chaveMT] === true) {
                            numerosVerificados.push(json.mf.mt[chaveMT]);
                        }
                    }
                    return numerosVerificados;
                });
            }
            try {
                const user = yield fortunedragonfunctions_1.default.getuserbyatk(token);
                let bet = cs * ml * 5;
                let saldoatual = user[0].saldo;
                const gamename = "fortune-dragon";
                (0, serverEvents_1.emitirEventoInterno)("att", {
                    token: token,
                    username: user[0].username,
                    bet: bet,
                    saldo: saldoatual,
                    rtp: user[0].rtp,
                    agentid: user[0].agentid,
                    gamecode: gamename,
                });
                const agent = yield allfunctions_1.default.getagentbyid(user[0].agentid);
                const checkuserbalance = yield (0, axios_1.default)({
                    maxBodyLength: Infinity,
                    method: "POST",
                    url: `${agent[0].callbackurl}gold_api/user_balance`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        user_code: user[0].username,
                    },
                });
                if (checkuserbalance.data.msg === "INVALID_USER") {
                    res.send(yield notcashdragon_1.default.notcash(saldoatual, cs, ml));
                    return false;
                }
                else if (checkuserbalance.data.msg === "INSUFFICIENT_USER_FUNDS") {
                    res.send(yield notcashdragon_1.default.notcash(saldoatual, cs, ml));
                    return false;
                }
                const retornado = user[0].valorganho;
                const valorapostado = user[0].valorapostado;
                const rtp = (retornado / valorapostado) * 100;
                console.log("RTP ATUAL " + rtp);
                console.log("BET ATUAL " + bet);
                const resultadospin = yield allfunctions_1.default.calcularganho(bet, saldoatual, token, gamename);
                if (resultadospin.result === "perda" || resultadospin.result === "ganho") {
                    if (saldoatual < bet) {
                        const semsaldo = yield notcashdragon_1.default.notcash(saldoatual, cs, ml);
                        res.send(semsaldo);
                        return false;
                    }
                }
                if (resultadospin.result === "perda") {
                    let newbalance = saldoatual - bet;
                    yield fortunedragonfunctions_1.default.attsaldobyatk(token, newbalance);
                    yield fortunedragonfunctions_1.default.atualizardebitado(token, bet);
                    yield fortunedragonfunctions_1.default.atualizarapostado(token, bet);
                    const perdajson = yield linhaperdadragon_1.default.linhaperda();
                    let json = {
                        dt: {
                            si: {
                                wp: null,
                                lw: null,
                                gm: 1,
                                it: perdajson.it,
                                orl: perdajson.rl,
                                fs: null,
                                mf: perdajson.mf,
                                ssaw: 0.0,
                                crtw: 0.0,
                                imw: false,
                                gwt: -1,
                                fb: null,
                                ctw: 0.0,
                                pmt: null,
                                cwc: 0,
                                fstc: null,
                                pcwc: 0,
                                rwsp: null,
                                hashr: "0:2;5;3#4;5;3#3;4;5#MV#3.0#MT#1#MG#0#",
                                ml: ml,
                                cs: cs,
                                rl: perdajson.rl,
                                sid: "1762525206562143744",
                                psid: "1762525206562143744",
                                st: 1,
                                nst: 1,
                                pf: 1,
                                aw: 0.0,
                                wid: 0,
                                wt: "C",
                                wk: "0_C",
                                wbn: null,
                                wfg: null,
                                blb: saldoatual,
                                blab: newbalance,
                                bl: newbalance,
                                tb: bet,
                                tbb: bet,
                                tw: 0.0,
                                np: -bet,
                                ocr: null,
                                mr: null,
                                ge: [1, 11],
                            },
                        },
                        err: null,
                    };
                    yield fortunedragonfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
                    const txnid = (0, uuid_1.v4)();
                    const dataFormatada = (0, moment_1.default)().toISOString();
                    yield apicontroller_1.default.callbackgame({
                        agent_code: agent[0].agentcode,
                        agent_secret: agent[0].secretKey,
                        user_code: user[0].username,
                        user_balance: user[0].saldo,
                        user_total_credit: user[0].valorganho,
                        user_total_debit: user[0].valorapostado,
                        game_type: "slot",
                        slot: {
                            provider_code: "PGSOFT",
                            game_code: gamename,
                            round_id: yield gerarNumeroUnico(),
                            type: "BASE",
                            bet: bet,
                            win: 0,
                            txn_id: `${txnid}`,
                            txn_type: "debit_credit",
                            is_buy: false,
                            is_call: false,
                            user_before_balance: user[0].saldo,
                            user_after_balance: newbalance,
                            agent_before_balance: 100,
                            agent_after_balance: 100,
                            created_at: dataFormatada,
                        },
                    });
                    res.send(json);
                }
                if (resultadospin.result === "ganho") {
                    const ganhojson = yield linhaganhodragon_1.default.linhaganho(bet);
                    const multplicador = yield countrwsp(ganhojson.rwsp);
                    yield lwchange(ganhojson.rwsp, ganhojson.lw, cs, ml);
                    const mulplicadores = yield verificarValores(ganhojson);
                    let valorganho = cs * ml * multplicador;
                    if (mulplicadores.length > 0) {
                        valorganho = cs * ml * multplicador * parseFloat(mulplicadores[0]);
                    }
                    // Chamar a função para verificar os valores
                    const newbalance = saldoatual + valorganho - bet;
                    yield fortunedragonfunctions_1.default.attsaldobyatk(token, newbalance);
                    yield fortunedragonfunctions_1.default.atualizardebitado(token, bet);
                    yield fortunedragonfunctions_1.default.atualizarapostado(token, bet);
                    yield fortunedragonfunctions_1.default.atualizarganho(token, valorganho);
                    let json = {
                        dt: {
                            si: {
                                wp: ganhojson.wp,
                                lw: ganhojson.lw,
                                gm: 1,
                                it: ganhojson.it,
                                orl: ganhojson.orl,
                                fs: null,
                                mf: ganhojson.mf,
                                ssaw: valorganho,
                                crtw: 0.0,
                                imw: false,
                                gwt: -1,
                                fb: null,
                                ctw: valorganho,
                                pmt: null,
                                cwc: 2,
                                fstc: null,
                                pcwc: 2,
                                rwsp: ganhojson.rwsp,
                                hashr: "0:5;6;3#5;0;3#4;4;4#R#4#021222#MV#3.0#MT#1#MG#6.0#",
                                ml: ml,
                                cs: cs,
                                rl: ganhojson.rl,
                                sid: "1762558970373799424",
                                psid: "1762558970373799424",
                                st: 1,
                                nst: 1,
                                pf: 1,
                                aw: valorganho,
                                wid: 0,
                                wt: "C",
                                wk: "0_C",
                                wbn: null,
                                wfg: null,
                                blb: saldoatual,
                                blab: newbalance,
                                bl: newbalance,
                                tb: bet,
                                tbb: bet,
                                tw: valorganho,
                                np: bet,
                                ocr: null,
                                mr: null,
                                ge: [1, 11],
                            },
                        },
                        err: null,
                    };
                    yield fortunedragonfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
                    const txnid = (0, uuid_1.v4)();
                    const dataFormatada = (0, moment_1.default)().toISOString();
                    yield apicontroller_1.default.callbackgame({
                        agent_code: agent[0].agentcode,
                        agent_secret: agent[0].secretKey,
                        user_code: user[0].username,
                        user_balance: user[0].saldo,
                        user_total_credit: user[0].valorganho,
                        user_total_debit: user[0].valorapostado,
                        game_type: "slot",
                        slot: {
                            provider_code: "PGSOFT",
                            game_code: gamename,
                            round_id: yield gerarNumeroUnico(),
                            type: "BASE",
                            bet: bet,
                            win: Number(valorganho),
                            txn_id: `${txnid}`,
                            txn_type: "debit_credit",
                            is_buy: false,
                            is_call: false,
                            user_before_balance: user[0].saldo,
                            user_after_balance: newbalance,
                            agent_before_balance: 100,
                            agent_after_balance: 100,
                            created_at: dataFormatada,
                        },
                    });
                    res.send(json);
                }
                if (resultadospin.result === "bonus" && resultadospin.gamecode === "fortune-dragon") {
                    const bonusjson = yield linhabonusdragon_1.default.linhabonus(resultadospin.json);
                    let call = yield allfunctions_1.default.getcallbyid(resultadospin.idcall);
                    if (call[0].steps === null && call[0].status === "pending") {
                        if (saldoatual < bet) {
                            const semsaldo = yield notcashdragon_1.default.notcash(saldoatual, cs, ml);
                            res.send(semsaldo);
                            return false;
                        }
                    }
                    if (call[0].steps === null && call[0].status === "pending") {
                        const steps = Object.keys(bonusjson).length - 1;
                        yield allfunctions_1.default.updatestepscall(resultadospin.idcall, steps);
                    }
                    let calltwo = yield allfunctions_1.default.getcallbyid(resultadospin.idcall);
                    if (calltwo[0].steps === 0) {
                        yield allfunctions_1.default.completecall(calltwo[0].id);
                    }
                    let multplicador = 0;
                    if (bonusjson[calltwo[0].steps].rwsp != null) {
                        multplicador = yield countrwsp(bonusjson[calltwo[0].steps].rwsp);
                    }
                    if (bonusjson[calltwo[0].steps].lw != null) {
                        yield lwchange(bonusjson[calltwo[0].steps].rwsp, bonusjson[calltwo[0].steps].lw, cs, ml);
                    }
                    const mulplicadoresjson = yield verificarValores(bonusjson[calltwo[0].steps]);
                    let mulplicadores = 0;
                    for (let chave in mulplicadoresjson) {
                        mulplicadores = mulplicadores + parseFloat(mulplicadoresjson[chave]);
                    }
                    const txnid = (0, uuid_1.v4)();
                    const dataFormatada = (0, moment_1.default)().toISOString();
                    let valorganho = cs * ml * multplicador * mulplicadores;
                    let newbalance = 0;
                    if (calltwo[0].steps === Object.keys(bonusjson).length - 1) {
                        newbalance = saldoatual - bet + valorganho;
                        yield fortunedragonfunctions_1.default.attsaldobyatk(token, newbalance);
                        yield apicontroller_1.default.callbackgame({
                            agent_code: agent[0].agentcode,
                            agent_secret: agent[0].secretKey,
                            user_code: user[0].username,
                            user_balance: user[0].saldo,
                            user_total_credit: user[0].valorganho,
                            user_total_debit: user[0].valorapostado,
                            game_type: "slot",
                            slot: {
                                provider_code: "PGSOFT",
                                game_code: gamename,
                                round_id: yield gerarNumeroUnico(),
                                type: "BASE",
                                bet: bet,
                                win: valorganho,
                                txn_id: `${txnid}`,
                                txn_type: "debit_credit",
                                is_buy: false,
                                is_call: false,
                                user_before_balance: user[0].saldo,
                                user_after_balance: newbalance,
                                agent_before_balance: 100,
                                agent_after_balance: 100,
                                created_at: dataFormatada,
                            },
                        });
                    }
                    newbalance = saldoatual + valorganho;
                    if (calltwo[0].steps === 0) {
                        newbalance = saldoatual + valorganho - bet;
                    }
                    yield fortunedragonfunctions_1.default.attawcall(calltwo[0].id, valorganho);
                    yield fortunedragonfunctions_1.default.attsaldobyatk(token, newbalance);
                    yield fortunedragonfunctions_1.default.atualizardebitado(token, bet);
                    yield fortunedragonfunctions_1.default.atualizarapostado(token, bet);
                    if (calltwo[0].steps > 0) {
                        yield allfunctions_1.default.subtrairstepscall(resultadospin.idcall);
                    }
                    if (bonusjson[calltwo[0].steps].fs.hasOwnProperty("aw")) {
                        bonusjson[calltwo[0].steps].fs["aw"] = (yield allfunctions_1.default.getcallbyid(resultadospin.idcall))[0].aw;
                    }
                    let json = {
                        dt: {
                            si: {
                                wp: bonusjson[calltwo[0].steps].wp,
                                lw: bonusjson[calltwo[0].steps].lw,
                                gm: 7,
                                it: bonusjson[calltwo[0].steps].it,
                                orl: bonusjson[calltwo[0].steps].orl,
                                fs: bonusjson[calltwo[0].steps].fs,
                                mf: bonusjson[calltwo[0].steps].mf,
                                ssaw: valorganho,
                                crtw: 0.0,
                                imw: false,
                                gwt: -1,
                                fb: null,
                                ctw: valorganho,
                                pmt: null,
                                cwc: bonusjson[calltwo[0].steps].cwc,
                                fstc: null,
                                pcwc: 0,
                                rwsp: null,
                                hashr: "0:6;5;2#6;5;2#5;7;5#MV#3.0#MT#7#MG#0#",
                                ml: ml,
                                cs: cs,
                                rl: bonusjson[calltwo[0].steps].rl,
                                sid: "1762619032324734464",
                                psid: "1762619032324734464",
                                st: bonusjson[calltwo[0].steps].st,
                                nst: bonusjson[calltwo[0].steps].nst,
                                pf: 1,
                                aw: (yield allfunctions_1.default.getcallbyid(resultadospin.idcall))[0].aw,
                                wid: 0,
                                wt: "C",
                                wk: "0_C",
                                wbn: null,
                                wfg: null,
                                blb: saldoatual,
                                blab: newbalance,
                                bl: newbalance,
                                tb: bet,
                                tbb: bet,
                                tw: valorganho,
                                np: -bet,
                                ocr: null,
                                mr: null,
                                ge: [2, 11],
                            },
                        },
                        err: null,
                    };
                    yield apicontroller_1.default.callbackgame({
                        agent_code: agent[0].agentcode,
                        agent_secret: agent[0].secretKey,
                        user_code: user[0].username,
                        user_balance: user[0].saldo,
                        user_total_credit: user[0].valorganho,
                        user_total_debit: user[0].valorapostado,
                        game_type: "slot",
                        slot: {
                            provider_code: "PGSOFT",
                            game_code: gamename,
                            round_id: yield gerarNumeroUnico(),
                            type: "BASE",
                            bet: 0,
                            win: Number(valorganho),
                            txn_id: `${txnid}`,
                            txn_type: "debit_credit",
                            is_buy: false,
                            is_call: true,
                            user_before_balance: user[0].saldo,
                            user_after_balance: newbalance,
                            agent_before_balance: 100,
                            agent_after_balance: 100,
                            created_at: dataFormatada,
                        },
                    });
                    yield fortunedragonfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
                    res.send(json);
                }
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    },
};
