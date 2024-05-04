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
const fortuneoxfunctions_1 = __importDefault(require("../../functions/fortune-ox/fortuneoxfunctions"));
const linhabonusox_1 = __importDefault(require("../../jsons/fortune-ox/linhabonusox"));
const linhaganhoox_1 = __importDefault(require("../../jsons/fortune-ox/linhaganhoox"));
const linhaperdaox_1 = __importDefault(require("../../jsons/fortune-ox/linhaperdaox"));
const notcashox_1 = __importDefault(require("../../jsons/fortune-ox/notcashox"));
exports.default = {
    getox(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.body.atk;
                const user = yield fortuneoxfunctions_1.default.getuserbyatk(token);
                const jsonprimay = yield fortuneoxfunctions_1.default.getjsonox(user[0].id);
                if (jsonprimay.length === 0) {
                    yield fortuneoxfunctions_1.default.createjsonox(user[0].id);
                }
                const json = yield fortuneoxfunctions_1.default.getjsonox(user[0].id);
                const jsonformatado = yield JSON.parse(json[0].json);
                res.send({
                    dt: {
                        fb: { is: true, bm: 100, t: 10.0 },
                        wt: { mw: 5.0, bw: 20.0, mgw: 35.0, smgw: 50.0 },
                        maxwm: null,
                        cs: [0.05, 0.5, 4.0],
                        ml: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        mxl: 10,
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
            try {
                const user = yield fortuneoxfunctions_1.default.getuserbyatk(token);
                let bet = cs * ml * 10;
                let saldoatual = user[0].saldo;
                const gamename = "fortune-ox";
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
                    res.send(yield notcashox_1.default.notcash(saldoatual, cs, ml));
                    return false;
                }
                else if (checkuserbalance.data.msg === "INSUFFICIENT_USER_FUNDS") {
                    res.send(yield notcashox_1.default.notcash(saldoatual, cs, ml));
                    return false;
                }
                const retornado = user[0].valorganho;
                const valorapostado = user[0].valorapostado;
                const rtp = (retornado / valorapostado) * 100;
                console.log("RTP ATUAL " + rtp);
                console.log("BET ATUAL " + bet);
                if (saldoatual < bet) {
                    const semsaldo = yield notcashox_1.default.notcash(saldoatual, cs, ml);
                    res.send(semsaldo);
                    return false;
                }
                const resultadospin = yield allfunctions_1.default.calcularganho(bet, saldoatual, token, gamename);
                if (resultadospin.result === "perda") {
                    let newbalance = saldoatual - bet;
                    yield fortuneoxfunctions_1.default.attsaldobyatk(token, newbalance);
                    yield fortuneoxfunctions_1.default.atualizardebitado(token, bet);
                    yield fortuneoxfunctions_1.default.atualizarapostado(token, bet);
                    const perdajson = yield linhaperdaox_1.default.linhaperda();
                    let json = {
                        dt: {
                            si: {
                                wp: null,
                                lw: null,
                                rf: perdajson.rf,
                                rtf: perdajson.rf,
                                fs: perdajson.fs,
                                rc: 0,
                                im: false,
                                itw: true,
                                wc: 70,
                                gwt: -1,
                                fb: null,
                                ctw: 0.0,
                                pmt: null,
                                cwc: 0,
                                fstc: null,
                                pcwc: 0,
                                rwsp: null,
                                hashr: "0:7;7;5#6;2;5#6;2;5#99;2;99#MV#6.0#MT#1#MG#0#",
                                ml: ml,
                                cs: cs,
                                rl: perdajson.rl,
                                sid: "1762263459343302144",
                                psid: "1762263459343302144",
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
                    yield fortuneoxfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
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
                    const ganhojson = yield linhaganhoox_1.default.linhaganho(bet);
                    const multplicador = yield countrwsp(ganhojson.rwsp);
                    yield lwchange(ganhojson.rwsp, ganhojson.lw, cs, ml);
                    const valorganho = cs * ml * multplicador;
                    const newbalance = saldoatual + valorganho - bet;
                    yield fortuneoxfunctions_1.default.attsaldobyatk(token, newbalance);
                    yield fortuneoxfunctions_1.default.atualizardebitado(token, bet);
                    yield fortuneoxfunctions_1.default.atualizarapostado(token, bet);
                    yield fortuneoxfunctions_1.default.atualizarganho(token, valorganho);
                    function gerarBooleanoAleatorio() {
                        // Gera um número aleatório entre 0 e 1
                        const boolean = Math.floor(Math.random() * 10) + 1;
                        console.log("NUMERO DO BOOLEANO " + boolean);
                        // Se o número for maior ou igual a 0.5, retorna true, caso contrário, retorna false
                        return boolean >= 5;
                    }
                    let json = {
                        dt: {
                            si: {
                                wp: ganhojson.wp,
                                lw: ganhojson.lw,
                                rf: ganhojson.rf,
                                rtf: gerarBooleanoAleatorio,
                                fs: ganhojson.fs,
                                rc: 0,
                                im: false,
                                itw: ganhojson.itw,
                                wc: 0,
                                gwt: -1,
                                fb: null,
                                ctw: valorganho,
                                pmt: null,
                                cwc: 1,
                                fstc: null,
                                pcwc: 1,
                                rwsp: ganhojson.rwsp,
                                hashr: "0:6;6;5#7;5;7#4;7;3#99;6;99#R#7#011221#MV#6.0#MT#1#MG#1.8#",
                                ml: cs,
                                cs: ml,
                                rl: ganhojson.rl,
                                sid: "1762282492281159168",
                                psid: "1762282492281159168",
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
                                np: -bet,
                                ocr: null,
                                mr: null,
                                ge: [1, 11],
                            },
                        },
                        err: null,
                    };
                    yield fortuneoxfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
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
                if (resultadospin.result === "bonus" && resultadospin.gamecode === "fortune-ox") {
                    const bonusjson = yield linhabonusox_1.default.linhabonus(resultadospin.json);
                    let call = yield allfunctions_1.default.getcallbyid(resultadospin.idcall);
                    if (call[0].steps === null && call[0].status === "pending") {
                        const steps = Object.keys(bonusjson).length - 1;
                        yield allfunctions_1.default.updatestepscall(resultadospin.idcall, steps);
                    }
                    let calltwo = yield allfunctions_1.default.getcallbyid(resultadospin.idcall);
                    if (calltwo[0].steps === 0) {
                        const multplicador = yield countrwsp(bonusjson[calltwo[0].steps].rwsp);
                        yield lwchange(bonusjson[calltwo[0].steps].rwsp, bonusjson[calltwo[0].steps].lw, cs, ml);
                        let valorganho = cs * ml * multplicador;
                        if (bonusjson[calltwo[0].steps].completed === true) {
                            valorganho = cs * ml * multplicador * 10;
                        }
                        const newbalance = saldoatual + valorganho - bet;
                        yield fortuneoxfunctions_1.default.attsaldobyatk(token, newbalance);
                        yield fortuneoxfunctions_1.default.atualizardebitado(token, bet);
                        yield fortuneoxfunctions_1.default.atualizarapostado(token, bet);
                        yield fortuneoxfunctions_1.default.atualizarganho(token, valorganho);
                        let json = {
                            dt: {
                                si: {
                                    wp: bonusjson[calltwo[0].steps].wp,
                                    lw: bonusjson[calltwo[0].steps].lw,
                                    rf: bonusjson[calltwo[0].steps].rf,
                                    rtf: bonusjson[calltwo[0].steps].rtf,
                                    fs: bonusjson[calltwo[0].steps].fs,
                                    rc: bonusjson[calltwo[0].steps].rc,
                                    im: bonusjson[calltwo[0].steps].im,
                                    itw: false,
                                    wc: 0,
                                    gwt: 3,
                                    fb: null,
                                    ctw: valorganho,
                                    pmt: null,
                                    cwc: 2,
                                    fstc: { "4": 1 },
                                    pcwc: 0,
                                    rwsp: bonusjson[calltwo[0].steps].rwsp,
                                    hashr: "1:5;5;5#5;5;5#5;5;5#99;5;99#R#5#001020#MV#0#MT#1#R#5#001120#MV#0#MT#1#R#5#001121#MV#0#MT#1#R#5#011120#MV#0#MT#1#R#5#011121#MV#0#MT#1#R#5#011221#MV#0#MT#1#R#5#011222#MV#0#MT#1#R#5#021221#MV#0#MT#1#R#5#021222#MV#0#MT#1#R#5#021322#MV#0#MT#1#MG#600.0#",
                                    ml: cs,
                                    cs: ml,
                                    rl: bonusjson[calltwo[0].steps].rl,
                                    sid: "1762318812932144640",
                                    psid: "1762318772436139520",
                                    st: 4,
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
                                    tb: 0.0,
                                    tbb: bet,
                                    tw: valorganho,
                                    np: valorganho,
                                    ocr: null,
                                    mr: null,
                                    ge: [3, 11],
                                },
                            },
                            err: null,
                        };
                        yield fortuneoxfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
                        yield allfunctions_1.default.completecall(calltwo[0].id);
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
                                is_call: true,
                                user_before_balance: user[0].saldo,
                                user_after_balance: newbalance,
                                agent_before_balance: 100,
                                agent_after_balance: 100,
                                created_at: dataFormatada,
                            },
                        });
                        res.send(json);
                        return false;
                    }
                    yield allfunctions_1.default.subtrairstepscall(resultadospin.idcall);
                    let json = {
                        dt: {
                            si: {
                                wp: null,
                                lw: null,
                                rf: bonusjson[calltwo[0].steps].rf,
                                rtf: bonusjson[calltwo[0].steps].rtf,
                                fs: bonusjson[calltwo[0].steps].fs,
                                rc: bonusjson[calltwo[0].steps].rc,
                                im: false,
                                itw: bonusjson[calltwo[0].steps].itw,
                                wc: 25,
                                gwt: -1,
                                fb: null,
                                ctw: 0.0,
                                pmt: null,
                                cwc: 0,
                                fstc: null,
                                pcwc: 0,
                                rwsp: bonusjson[calltwo[0].steps].rwsp,
                                hashr: "0:7;4;7#7;4;7#7;4;7#99;4;99#MV#6.0#MT#1#MG#0#",
                                ml: ml,
                                cs: cs,
                                rl: bonusjson[calltwo[0].steps].rl,
                                sid: "1762312905938632192",
                                psid: "1762312905938632192",
                                st: bonusjson[calltwo[0].steps].st, //ANIMAÇÃO DE LEVANTAR
                                nst: 4,
                                pf: 1,
                                aw: 0.0,
                                wid: 0,
                                wt: "C",
                                wk: "0_C",
                                wbn: null,
                                wfg: null,
                                blb: saldoatual,
                                blab: saldoatual,
                                bl: saldoatual,
                                tb: bet,
                                tbb: bet,
                                tw: 0.0,
                                np: -bet,
                                ocr: null,
                                mr: null,
                                ge: [2, 11],
                            },
                        },
                        err: null,
                    };
                    res.send(json);
                }
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    },
};
