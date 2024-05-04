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
const dragontigerluckfunctions_1 = __importDefault(require("../../functions/dragon-tiger-luck/dragontigerluckfunctions"));
const allfunctions_1 = __importDefault(require("../../functions/allfunctions"));
const apicontroller_1 = __importDefault(require("../apicontroller"));
const serverEvents_1 = require("../../serverEvents");
const linhaganhodragontigerluck_1 = __importDefault(require("../../jsons/dragon-tiger-luck/linhaganhodragontigerluck"));
const linhaperdadragontigerluck_1 = __importDefault(require("../../jsons/dragon-tiger-luck/linhaperdadragontigerluck"));
const linhabonusdragontigerluck_1 = __importDefault(require("../../jsons/dragon-tiger-luck/linhabonusdragontigerluck"));
const notcashdragontigerluck_1 = __importDefault(require("../../jsons/dragon-tiger-luck/notcashdragontigerluck"));
require("dotenv/config");
exports.default = {
    getdragontiger(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.body.atk;
                const user = yield dragontigerluckfunctions_1.default.getuserbyatk(token);
                const jsonprimay = yield dragontigerluckfunctions_1.default.getjsondragontigerlucky(user[0].id);
                if (jsonprimay.length === 0) {
                    yield dragontigerluckfunctions_1.default.createjsondragontigerlucky(user[0].id);
                }
                const json = yield dragontigerluckfunctions_1.default.getjsondragontigerlucky(user[0].id);
                const jsonformatado = yield JSON.parse(json[0].json);
                res.send({
                    dt: {
                        fb: null,
                        wt: { mw: 15, bw: 25, mgw: 50, smgw: 100 },
                        maxwm: null,
                        cs: [0.5, 5, 15, 50],
                        ml: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        mxl: 1,
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
                    for (let i = 1; i <= 9; i++) {
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
            function encontrarRepetido(json) {
                return __awaiter(this, void 0, void 0, function* () {
                    const contador = {};
                    // Contar a ocorrência de cada número
                    for (const numero of json) {
                        contador[numero] = (contador[numero] || 0) + 1;
                    }
                    // Verificar se algum número se repete três vezes
                    for (const numero in contador) {
                        if (contador[numero] === 3) {
                            return parseInt(numero);
                        }
                    }
                    // Se nenhum número se repetir três vezes, retornar null
                    return null;
                });
            }
            try {
                const user = yield dragontigerluckfunctions_1.default.getuserbyatk(token);
                let bet = cs * ml * 2;
                let saldoatual = user[0].saldo;
                const gamename = "dragon-tiger-luck";
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
                    res.send(yield notcashdragontigerluck_1.default.notcash(saldoatual, cs, ml));
                    return false;
                }
                else if (checkuserbalance.data.msg === "INSUFFICIENT_USER_FUNDS") {
                    res.send(yield notcashdragontigerluck_1.default.notcash(saldoatual, cs, ml));
                    return false;
                }
                const retornado = user[0].valorganho;
                const valorapostado = user[0].valorapostado;
                const rtp = (retornado / valorapostado) * 100;
                console.log("RTP ATUAL " + rtp);
                console.log("BET ATUAL " + bet);
                if (saldoatual < bet) {
                    const semsaldo = yield notcashdragontigerluck_1.default.notcash(saldoatual, cs, ml);
                    res.send(semsaldo);
                    return false;
                }
                const resultadospin = yield allfunctions_1.default.calcularganho(bet, saldoatual, token, gamename);
                if (resultadospin.result === "perda") {
                    let newbalance = saldoatual - bet;
                    yield dragontigerluckfunctions_1.default.attsaldobyatk(token, newbalance);
                    yield dragontigerluckfunctions_1.default.atualizardebitado(token, bet);
                    yield dragontigerluckfunctions_1.default.atualizarapostado(token, bet);
                    const perdajson = yield linhaperdadragontigerluck_1.default.linhaperda();
                    let json = {
                        dt: {
                            si: {
                                mrl: perdajson.mrl,
                                gpt: 3,
                                gwt: -1,
                                fb: null,
                                ctw: 0.0,
                                pmt: null,
                                cwc: 0,
                                fstc: null,
                                pcwc: 0,
                                rwsp: null,
                                hashr: "0:3;0;1#MV#2.50#MT#1#MG#0#",
                                ml: ml,
                                cs: cs,
                                rl: perdajson.rl,
                                sid: "1773496005090742272",
                                psid: "1773496005090742272",
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
                    yield dragontigerluckfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
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
                    const ganhojson = yield linhaganhodragontigerluck_1.default.linhaganho(bet);
                    let multplicador = 0;
                    // await lwchange(ganhojson.rwsp, ganhojson.lw, cs, ml)
                    let valorganho = 0;
                    if (ganhojson.mrl[1].wp != null) {
                        const isrepetido = yield encontrarRepetido(ganhojson.mrl[1].orl);
                        console.log("REPETIDO " + isrepetido);
                        if (isrepetido === null) {
                            multplicador = 5;
                        }
                        else if (isrepetido === 3) {
                            multplicador = 25;
                        }
                        else if (isrepetido === 2) {
                            multplicador = 50;
                        }
                        else if (isrepetido === 1) {
                            multplicador = 100;
                        }
                        valorganho = cs * ml * multplicador;
                        ganhojson.mrl[1].lw[1] = valorganho;
                        ganhojson.mrl[1].tw = valorganho;
                    }
                    if (ganhojson.mrl[2].wp != null) {
                        const isrepetido = yield encontrarRepetido(ganhojson.mrl[2].orl);
                        console.log("REPETIDO " + isrepetido);
                        if (isrepetido === null) {
                            multplicador = 5;
                        }
                        else if (isrepetido === 3) {
                            multplicador = 25;
                        }
                        else if (isrepetido === 2) {
                            multplicador = 50;
                        }
                        else if (isrepetido === 1) {
                            multplicador = 100;
                        }
                        valorganho = cs * ml * multplicador;
                        ganhojson.mrl[2].lw[1] = valorganho;
                        ganhojson.mrl[2].tw = valorganho;
                    }
                    const newbalance = saldoatual + valorganho - bet;
                    yield dragontigerluckfunctions_1.default.attsaldobyatk(token, newbalance);
                    yield dragontigerluckfunctions_1.default.atualizardebitado(token, bet);
                    yield dragontigerluckfunctions_1.default.atualizarapostado(token, bet);
                    yield dragontigerluckfunctions_1.default.atualizarganho(token, valorganho);
                    let json = {
                        dt: {
                            si: {
                                mrl: ganhojson.mrl,
                                gpt: 3,
                                gwt: -1,
                                fb: null,
                                ctw: valorganho,
                                pmt: null,
                                cwc: 1,
                                fstc: null,
                                pcwc: 1,
                                rwsp: null,
                                hashr: "0:3;2;2#R#3#001020#MV#0.50#MT#1#MG#1.25#",
                                ml: ml,
                                cs: cs,
                                rl: [-1, -1, -1],
                                sid: "1773509877478589952",
                                psid: "1773509877478589952",
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
                    yield dragontigerluckfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
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
                if (resultadospin.result === "bonus" && resultadospin.gamecode === "dragon-tiger-luck") {
                    const bonusjson = yield linhabonusdragontigerluck_1.default.linhabonus(resultadospin.json);
                    let call = yield allfunctions_1.default.getcallbyid(resultadospin.idcall);
                    // if (call[0].steps === null && call[0].status === "pending") {
                    //    const steps = Object.keys(cartajson).length - 1
                    //    await allfunctions.updatestepscall(resultadospin.idcall, steps)
                    // }
                    if (call[0].steps === null && call[0].status === "pending") {
                        if (saldoatual < bet) {
                            const semsaldo = yield notcashdragontigerluck_1.default.notcash(saldoatual, cs, ml);
                            res.send(semsaldo);
                            return false;
                        }
                    }
                    let multplicador = 0;
                    let valorganho = cs * ml * multplicador;
                    let multplicadormrl1 = 0;
                    let multplicadormrl2 = 0;
                    if (bonusjson.mrl[1].wp != null && bonusjson.mrl[2].wp != null) {
                        const isrepetidomrl1 = yield encontrarRepetido(bonusjson.mrl[1].orl);
                        if (isrepetidomrl1 === null) {
                            multplicadormrl1 = 5;
                        }
                        else if (isrepetidomrl1 === 3) {
                            multplicadormrl1 = 25;
                        }
                        else if (isrepetidomrl1 === 2) {
                            multplicadormrl1 = 50;
                        }
                        else if (isrepetidomrl1 === 1) {
                            multplicadormrl1 = 100;
                        }
                        const isrepetidomrl2 = yield encontrarRepetido(bonusjson.mrl[2].orl);
                        if (isrepetidomrl2 === null) {
                            multplicadormrl2 = 5;
                        }
                        else if (isrepetidomrl2 === 3) {
                            multplicadormrl2 = 25;
                        }
                        else if (isrepetidomrl2 === 2) {
                            multplicadormrl2 = 50;
                        }
                        else if (isrepetidomrl2 === 1) {
                            multplicadormrl2 = 100;
                        }
                    }
                    let valorganhomrl1 = cs * ml * multplicadormrl1;
                    bonusjson.mrl[1].lw[1] = valorganhomrl1;
                    bonusjson.mrl[1].tw = valorganhomrl1;
                    let valorganhomrl2 = cs * ml * multplicadormrl2;
                    bonusjson.mrl[2].lw[1] = valorganhomrl2;
                    bonusjson.mrl[2].tw = valorganhomrl2;
                    valorganho = (valorganhomrl1 + valorganhomrl2) * 2;
                    const newbalance = saldoatual + valorganho - bet;
                    yield dragontigerluckfunctions_1.default.attsaldobyatk(token, newbalance);
                    yield dragontigerluckfunctions_1.default.atualizardebitado(token, bet);
                    yield dragontigerluckfunctions_1.default.atualizarapostado(token, bet);
                    yield dragontigerluckfunctions_1.default.atualizarganho(token, valorganho);
                    let calltwo = yield allfunctions_1.default.getcallbyid(resultadospin.idcall);
                    let json = {
                        dt: {
                            si: {
                                mrl: bonusjson.mrl,
                                gpt: 3,
                                gwt: -1,
                                fb: null,
                                ctw: valorganho,
                                pmt: null,
                                cwc: 1,
                                fstc: null,
                                pcwc: 1,
                                rwsp: null,
                                hashr: "0:2;1;2#R#2#001020#MV#0.50#MT#1#MG#5.00#",
                                ml: ml,
                                cs: cs,
                                rl: [-1, -1, -1],
                                sid: "1773525163992814592",
                                psid: "1773525163992814592",
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
                                np: valorganho - bet,
                                ocr: null,
                                mr: null,
                                ge: [1, 11],
                            },
                        },
                        err: null,
                    };
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
                    yield allfunctions_1.default.completecall(calltwo[0].id);
                    res.send(json);
                }
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    },
};
