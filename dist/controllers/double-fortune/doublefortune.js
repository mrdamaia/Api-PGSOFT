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
require("dotenv/config");
//IMPORT FUNCTIONS
const serverEvents_1 = require("../../serverEvents");
const allfunctions_1 = __importDefault(require("../../functions/allfunctions"));
const apicontroller_1 = __importDefault(require("../apicontroller"));
const doublefortunefunctions_1 = __importDefault(require("../../functions/double-fortune/doublefortunefunctions"));
//IMPORT LINHAS
const linhaperdadouble_1 = __importDefault(require("../../jsons/double-fortune/linhaperdadouble"));
const linhaganhodouble_1 = __importDefault(require("../../jsons/double-fortune/linhaganhodouble"));
const linhabonusdouble_1 = __importDefault(require("../../jsons/double-fortune/linhabonusdouble"));
const notcashdouble_1 = __importDefault(require("../../jsons/double-fortune/notcashdouble"));
exports.default = {
    getdouble(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.body.atk;
                const user = yield doublefortunefunctions_1.default.getuserbyatk(token);
                const jsonprimay = yield doublefortunefunctions_1.default.getjsondouble(user[0].id);
                if (jsonprimay.length === 0) {
                    yield doublefortunefunctions_1.default.createjsondouble(user[0].id);
                }
                const json = yield doublefortunefunctions_1.default.getjsondouble(user[0].id);
                const jsonformatado = yield JSON.parse(json[0].json);
                res.send({
                    dt: {
                        fb: null,
                        wt: {
                            mw: 5.0,
                            bw: 20.0,
                            mgw: 35.0,
                            smgw: 50.0,
                        },
                        maxwm: null,
                        cs: [0.01, 0.06, 0.4],
                        ml: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        mxl: 30,
                        bl: user[0].saldo,
                        inwe: false,
                        iuwe: false,
                        ls: jsonformatado.dt,
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
                            for (let chave2 in json2) {
                                if (json2.hasOwnProperty(chave2)) {
                                    json2[chave] = ganho;
                                }
                            }
                        }
                    }
                });
            }
            function returnrwspnotnull(json) {
                return __awaiter(this, void 0, void 0, function* () {
                    let chavereturn = "";
                    for (const chave in json) {
                        if (json[chave] != null) {
                            chavereturn = chave;
                        }
                    }
                    return chavereturn;
                });
            }
            function countrwspzero(json) {
                return __awaiter(this, void 0, void 0, function* () {
                    let multplicador = 0;
                    for (let i = 1; i <= 30; i++) {
                        const chave = i.toString();
                        if (json.hasOwnProperty(chave)) {
                            multplicador = multplicador + parseFloat(json[chave]);
                        }
                    }
                    return multplicador;
                });
            }
            function countrwspone(json) {
                return __awaiter(this, void 0, void 0, function* () {
                    let multplicador = 0;
                    for (let i = 1; i <= 30; i++) {
                        const chave = i.toString();
                        if (json.hasOwnProperty(chave)) {
                            multplicador = multplicador + parseFloat(json[chave]);
                        }
                    }
                    return multplicador;
                });
            }
            function countkeyrwspnull(json) {
                return __awaiter(this, void 0, void 0, function* () {
                    let count = 0;
                    for (let chave in json) {
                        if (json[chave] === null) {
                            count = count + 1;
                        }
                    }
                    return count;
                });
            }
            function countrwsp(json) {
                return __awaiter(this, void 0, void 0, function* () {
                    let multplicador = 0;
                    for (let i = 1; i <= 30; i++) {
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
            function returnrwm(json) {
                return __awaiter(this, void 0, void 0, function* () {
                    let value = 0;
                    for (let chave in json) {
                        if (json.hasOwnProperty(chave)) {
                            value = value + parseFloat(json[chave]);
                        }
                    }
                    return value;
                });
            }
            try {
                const user = yield doublefortunefunctions_1.default.getuserbyatk(token);
                let bet = cs * ml * 30;
                console.log(bet);
                let saldoatual = user[0].saldo;
                const gamename = "double-fortune";
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
                    res.send(yield notcashdouble_1.default.notcash(saldoatual, cs, ml));
                    return false;
                }
                else if (checkuserbalance.data.msg === "INSUFFICIENT_USER_FUNDS") {
                    res.send(yield notcashdouble_1.default.notcash(saldoatual, cs, ml));
                    return false;
                }
                const retornado = user[0].valorganho;
                const valorapostado = user[0].valorapostado;
                const rtp = (retornado / valorapostado) * 100;
                console.log("RTP ATUAL " + rtp);
                console.log("BET ATUAL " + bet);
                if (saldoatual < bet) {
                    const semsaldo = yield notcashdouble_1.default.notcash(saldoatual, cs, ml);
                    res.send(semsaldo);
                    return false;
                }
                const resultadospin = yield allfunctions_1.default.calcularganho(bet, saldoatual, token, gamename);
                if (resultadospin.result === "perda") {
                    let newbalance = saldoatual - bet;
                    yield doublefortunefunctions_1.default.attsaldobyatk(token, newbalance);
                    yield doublefortunefunctions_1.default.atualizardebitado(token, bet);
                    yield doublefortunefunctions_1.default.atualizarapostado(token, bet);
                    const perdajson = yield linhaperdadouble_1.default.linhaperda();
                    let json = {
                        dt: {
                            si: {
                                wp: null,
                                lw: null,
                                lwm: null,
                                slw: perdajson.slw,
                                nk: null,
                                sc: 0,
                                fs: null,
                                gwt: -1,
                                fb: null,
                                ctw: 0.0,
                                pmt: null,
                                cwc: 0,
                                fstc: null,
                                pcwc: 0,
                                rwsp: { "0": null },
                                hashr: "0:11;5;18;5;7#13;8;0;11;3#13;5;16;17;17#MV#3.0#MT#1#MG#0#",
                                ml: ml,
                                cs: cs,
                                rl: perdajson.rl,
                                sid: "1772662473641360896",
                                psid: "1772662473641360896",
                                st: perdajson.st,
                                nst: perdajson.nst,
                                pf: perdajson.pf,
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
                    yield doublefortunefunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
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
                    const ganhojson = yield linhaganhodouble_1.default.linhaganho(bet);
                    const multplicador = yield countrwsp(ganhojson.rwsp[0]);
                    yield lwchange(ganhojson.rwsp[0], ganhojson.lw, cs, ml);
                    let valorganho = cs * ml * multplicador;
                    console.log("VALOR GANHO " + valorganho);
                    // if (ganhojson.rwm != null) {
                    //    wmvalue = await returnrwm(ganhojson.rwm)
                    //    valorganho = valorganho * wmvalue
                    // }
                    ganhojson.slw[0] = valorganho;
                    const newbalance = saldoatual + valorganho - bet;
                    yield doublefortunefunctions_1.default.attsaldobyatk(token, newbalance);
                    yield doublefortunefunctions_1.default.atualizardebitado(token, bet);
                    yield doublefortunefunctions_1.default.atualizarapostado(token, bet);
                    yield doublefortunefunctions_1.default.atualizarganho(token, valorganho);
                    let json = {
                        dt: {
                            si: {
                                wp: ganhojson.wp,
                                lw: ganhojson.lw,
                                lwm: null,
                                slw: ganhojson.slw,
                                nk: ganhojson.nk,
                                sc: 1,
                                fs: null,
                                gwt: -1,
                                fb: null,
                                ctw: 27.0,
                                pmt: null,
                                cwc: 1,
                                fstc: null,
                                pcwc: 1,
                                rwsp: ganhojson.rwsp,
                                hashr: "0:11;10;15;5;17#13;2;12;13;14#10;17;17;3;1#R#10#0210#MV#18.0#MT#1#R#10#0210#MV#18.0#MT#1#R#10#0210#MV#18.0#MT#1#MG#27.0#",
                                ml: ml,
                                cs: cs,
                                rl: ganhojson.rl,
                                sid: "1772672877272694272",
                                psid: "1772672877272694272",
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
                                np: valorganho,
                                ocr: null,
                                mr: null,
                                ge: [1, 11],
                            },
                        },
                        err: null,
                    };
                    yield doublefortunefunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
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
                if (resultadospin.result === "bonus" && resultadospin.gamecode === "double-fortune") {
                    const bonusjson = yield linhabonusdouble_1.default.linhabonus(resultadospin.json);
                    let call = yield allfunctions_1.default.getcallbyid(resultadospin.idcall);
                    if (call[0].steps === null && call[0].status === "pending") {
                        if (saldoatual < bet) {
                            const semsaldo = yield notcashdouble_1.default.notcash(saldoatual, cs, ml);
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
                    if (bonusjson[calltwo[0].steps].lw != null) {
                        yield lwchange(bonusjson[calltwo[0].steps].rwsp[0], bonusjson[calltwo[0].steps].fs.lw, cs, ml);
                    }
                    if (bonusjson[calltwo[0].steps].fs.lw != null) {
                        yield lwchange(bonusjson[calltwo[0].steps].rwsp[1], bonusjson[calltwo[0].steps].lw, cs, ml);
                    }
                    let wmvalue = 0;
                    const txnid = (0, uuid_1.v4)();
                    const dataFormatada = (0, moment_1.default)().toISOString();
                    let valorganho = 0;
                    if (bonusjson[calltwo[0].steps].rwsp[0] != null || (bonusjson[calltwo[0].steps].rwsp[1] != null && (yield countkeyrwspnull(bonusjson[calltwo[0].steps].rwsp)) > 0)) {
                        let chave = yield returnrwspnotnull(bonusjson[calltwo[0].steps].rwsp);
                        let rwpschave = yield countrwsp(bonusjson[calltwo[0].steps].rwsp[chave]);
                        valorganho = cs * ml * rwpschave;
                        if (bonusjson[calltwo[0].steps].fs.slw != null) {
                            bonusjson[calltwo[0].steps].fs.slw[chave] = valorganho;
                        }
                    }
                    if ((yield countkeyrwspnull(bonusjson[calltwo[0].steps].rwsp)) === 0 && (yield allfunctions_1.default.getcallbyid(resultadospin.idcall))[0].steps != Object.keys(bonusjson).length - 1) {
                        let multzero = 0;
                        let multone = 0;
                        if (bonusjson[calltwo[0].steps].rwsp[0] != null) {
                            multzero = yield countrwspzero(bonusjson[calltwo[0].steps].rwsp[0]);
                        }
                        if (bonusjson[calltwo[0].steps].rwsp[1] != null) {
                            multone = yield countrwspone(bonusjson[calltwo[0].steps].rwsp[1]);
                        }
                        let valorganhorolozero = cs * ml * multzero;
                        let valorganhoroloone = cs * ml * multone;
                        console.log("VALOR GANHO ROLO 0 " + valorganhorolozero);
                        console.log("VALOR GANHO ROLO 1 " + valorganhoroloone);
                        bonusjson[calltwo[0].steps].slw[0] = valorganhoroloone;
                        bonusjson[calltwo[0].steps].slw[1] = valorganhoroloone * 8;
                        if (bonusjson[calltwo[0].steps].fs != null && bonusjson[calltwo[0].steps].fs.slw != null) {
                            bonusjson[calltwo[0].steps].fs.slw[0] = valorganhorolozero;
                            bonusjson[calltwo[0].steps].fs.slw[1] = valorganhorolozero * 8;
                        }
                        valorganho = valorganhorolozero * 8 + valorganhoroloone * 8;
                    }
                    console.log("VALOR GANHO " + valorganho);
                    let newbalance = 0;
                    if (calltwo[0].steps === Object.keys(bonusjson).length - 1) {
                        newbalance = saldoatual - bet + valorganho;
                        yield doublefortunefunctions_1.default.attsaldobyatk(token, newbalance);
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
                    yield doublefortunefunctions_1.default.attawcall(calltwo[0].id, valorganho);
                    yield doublefortunefunctions_1.default.attsaldobyatk(token, newbalance);
                    yield doublefortunefunctions_1.default.atualizardebitado(token, bet);
                    yield doublefortunefunctions_1.default.atualizarapostado(token, bet);
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
                                lwmc: bonusjson[calltwo[0].steps].lwmc,
                                slw: bonusjson[calltwo[0].steps].slw,
                                nk: null,
                                sc: bonusjson[calltwo[0].steps].sc,
                                fs: bonusjson[calltwo[0].steps].fs,
                                gwt: -1,
                                fb: null,
                                ctw: valorganho,
                                pmt: null,
                                cwc: 1,
                                fstc: null,
                                pcwc: 1,
                                rwsp: bonusjson[calltwo[0].steps].rwsp,
                                hashr: "0:11;10;15;5;17#13;2;12;13;14#10;17;17;3;1#R#10#0210#MV#18.0#MT#1#R#10#0210#MV#18.0#MT#1#R#10#0210#MV#18.0#MT#1#MG#27.0#",
                                ml: ml,
                                cs: cs,
                                rl: bonusjson[calltwo[0].steps].rl,
                                sid: "1772672877272694272",
                                psid: "1772672877272694272",
                                st: bonusjson[calltwo[0].steps].st,
                                nst: bonusjson[calltwo[0].steps].nst,
                                pf: bonusjson[calltwo[0].steps].pf,
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
                                np: valorganho,
                                ocr: null,
                                mr: null,
                                ge: [1, 11],
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
                    yield doublefortunefunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
                    res.send(json);
                }
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    },
};
