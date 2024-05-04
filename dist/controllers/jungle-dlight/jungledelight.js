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
const jungledelightfunctions_1 = __importDefault(require("../../functions/jungle-delight/jungledelightfunctions"));
//IMPORT LINHAS
const linhaperdajungle_1 = __importDefault(require("../../jsons/jungle-delight/linhaperdajungle"));
const linhaganhojungle_1 = __importDefault(require("../../jsons/jungle-delight/linhaganhojungle"));
const linhabonusjungle_1 = __importDefault(require("../../jsons/jungle-delight/linhabonusjungle"));
const notcashjungle_1 = __importDefault(require("../../jsons/jungle-delight/notcashjungle"));
exports.default = {
    getjungle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.body.atk;
                const user = yield jungledelightfunctions_1.default.getuserbyatk(token);
                const jsonprimay = yield jungledelightfunctions_1.default.getjsonjungle(user[0].id);
                if (jsonprimay.length === 0) {
                    yield jungledelightfunctions_1.default.creajsonjungle(user[0].id);
                }
                const json = yield jungledelightfunctions_1.default.getjsonjungle(user[0].id);
                const jsonformatado = yield JSON.parse(json[0].json);
                res.send({
                    dt: {
                        fb: { is: true, bm: 100, t: 0.75 },
                        wt: { mw: 5, bw: 10, mgw: 25, smgw: 50 },
                        maxwm: null,
                        cs: [0.02, 0.2, 2],
                        ml: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        mxl: 20,
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
            function countrwsp(json) {
                return __awaiter(this, void 0, void 0, function* () {
                    let multplicador = 0;
                    for (let i = 1; i <= 25; i++) {
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
                const user = yield jungledelightfunctions_1.default.getuserbyatk(token);
                let bet = cs * ml * 20;
                console.log(bet);
                let saldoatual = user[0].saldo;
                const gamename = "jungle-delight";
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
                    res.send(yield notcashjungle_1.default.notcash(saldoatual, cs, ml));
                    return false;
                }
                else if (checkuserbalance.data.msg === "INSUFFICIENT_USER_FUNDS") {
                    res.send(yield notcashjungle_1.default.notcash(saldoatual, cs, ml));
                    return false;
                }
                const retornado = user[0].valorganho;
                const valorapostado = user[0].valorapostado;
                const rtp = (retornado / valorapostado) * 100;
                console.log("RTP ATUAL " + rtp);
                console.log("BET ATUAL " + bet);
                if (saldoatual < bet) {
                    const semsaldo = yield notcashjungle_1.default.notcash(saldoatual, cs, ml);
                    res.send(semsaldo);
                    return false;
                }
                const resultadospin = yield allfunctions_1.default.calcularganho(bet, saldoatual, token, gamename);
                console.log(resultadospin);
                if (resultadospin.result === "perda") {
                    let newbalance = saldoatual - bet;
                    yield jungledelightfunctions_1.default.attsaldobyatk(token, newbalance);
                    yield jungledelightfunctions_1.default.atualizardebitado(token, bet);
                    yield jungledelightfunctions_1.default.atualizarapostado(token, bet);
                    const perdajson = yield linhaperdajungle_1.default.linhaperda();
                    let json = {
                        dt: {
                            si: {
                                wp: null,
                                lw: null,
                                c: null,
                                orl: null,
                                fs: null,
                                gwt: -1,
                                fb: null,
                                ctw: 0.0,
                                pmt: null,
                                cwc: 0,
                                fstc: null,
                                pcwc: 0,
                                rwsp: null,
                                hashr: "0:7;8;8;6;4#5;1;8;6;3#5;9;8;6;9#MV#0.60#MT#1#MG#0#",
                                ml: ml,
                                cs: cs,
                                rl: perdajson.rl,
                                sid: "1771284745113501184",
                                psid: "1771284745113501184",
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
                    yield jungledelightfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
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
                    const ganhojson = yield linhaganhojungle_1.default.linhaganho(bet);
                    const multplicador = yield countrwsp(ganhojson.rwsp);
                    yield lwchange(ganhojson.rwsp, ganhojson.lw, cs, ml);
                    let valorganho = cs * ml * multplicador;
                    let wmvalue = 0;
                    console.log("VALOR GANHO " + valorganho);
                    if (ganhojson.rwm != null) {
                        wmvalue = yield returnrwm(ganhojson.rwm);
                        valorganho = valorganho * wmvalue;
                    }
                    const newbalance = saldoatual + valorganho - bet;
                    yield jungledelightfunctions_1.default.attsaldobyatk(token, newbalance);
                    yield jungledelightfunctions_1.default.atualizardebitado(token, bet);
                    yield jungledelightfunctions_1.default.atualizarapostado(token, bet);
                    yield jungledelightfunctions_1.default.atualizarganho(token, valorganho);
                    let json = {
                        dt: {
                            si: {
                                wp: ganhojson.wp,
                                lw: ganhojson.lw,
                                c: ganhojson.c,
                                orl: null,
                                fs: null,
                                gwt: 1,
                                fb: null,
                                ctw: valorganho,
                                pmt: null,
                                cwc: 1,
                                fstc: null,
                                pcwc: 1,
                                rwsp: ganhojson.rwsp,
                                hashr: "0:5;5;6;9;4#7;0;3;6;9#6;6;0;6;1#R#6#02122232#MV#12.0#MT#1#R#5#001122#MV#12.0#MT#1#R#6#02112031#MV#12.0#MT#1#R#7#011122#MV#12.0#MT#1#R#6#02112231#MV#12.0#MT#1#MG#45.6#",
                                ml: ml,
                                cs: cs,
                                rl: ganhojson.rl,
                                sid: "1771296599466507776",
                                psid: "1771296599466507776",
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
                    yield jungledelightfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
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
                if (resultadospin.result === "bonus" && resultadospin.gamecode === "jungle-delight") {
                    const bonusjson = yield linhabonusjungle_1.default.linhabonus(resultadospin.json);
                    let call = yield allfunctions_1.default.getcallbyid(resultadospin.idcall);
                    if (call[0].steps === null && call[0].status === "pending") {
                        if (saldoatual < bet) {
                            const semsaldo = yield notcashjungle_1.default.notcash(saldoatual, cs, ml);
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
                    let wmvalue = 0;
                    const txnid = (0, uuid_1.v4)();
                    const dataFormatada = (0, moment_1.default)().toISOString();
                    let valorganho = cs * ml * multplicador;
                    let valorganhonowm = cs * ml * multplicador;
                    let newbalance = 0;
                    if (calltwo[0].steps === Object.keys(bonusjson).length - 1) {
                        newbalance = saldoatual - bet + valorganho;
                        yield jungledelightfunctions_1.default.attsaldobyatk(token, newbalance);
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
                    yield jungledelightfunctions_1.default.attawcall(calltwo[0].id, valorganho);
                    yield jungledelightfunctions_1.default.attsaldobyatk(token, newbalance);
                    yield jungledelightfunctions_1.default.atualizardebitado(token, bet);
                    yield jungledelightfunctions_1.default.atualizarapostado(token, bet);
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
                                c: bonusjson[calltwo[0].steps].c,
                                orl: bonusjson[calltwo[0].steps].orl,
                                fs: bonusjson[calltwo[0].steps].fs,
                                gwt: -1,
                                fb: null,
                                ctw: 0.3,
                                pmt: null,
                                cwc: 1,
                                fstc: bonusjson[calltwo[0].steps].fstc,
                                pcwc: 0,
                                rwsp: bonusjson[calltwo[0].steps].rwsp,
                                hashr: "4:4;3;9;9;5#5;8;8;5;6#8;5;8;8;7#R#8#021121#MV#0#MT#1#R#8#021122#MV#0#MT#1#MG#0.30#",
                                ml: ml,
                                cs: cs,
                                rl: bonusjson[calltwo[0].steps].rl,
                                sid: "1771336461825539584",
                                psid: "1771329156367187456",
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
                                tb: 0.0,
                                tbb: bet,
                                tw: valorganho,
                                np: bet,
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
                    yield jungledelightfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
                    res.send(json);
                }
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    },
};
