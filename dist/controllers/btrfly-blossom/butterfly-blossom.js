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
const redis_1 = require("redis");
//IMPORT FUNCTIONS
const serverEvents_1 = require("../../serverEvents");
const allfunctions_1 = __importDefault(require("../../functions/allfunctions"));
const apicontroller_1 = __importDefault(require("../apicontroller"));
const butterflyblossomfunctions_1 = __importDefault(require("../../functions/btrfly-blossom/butterflyblossomfunctions"));
//IMPORT LINHAS
const linhaperdabtrfly_1 = __importDefault(require("../../jsons/btrfly-blossom/linhaperdabtrfly"));
const linhabonusbikini_1 = __importDefault(require("../../jsons/bikini-paradise/linhabonusbikini"));
const notcashbutterfly_1 = __importDefault(require("../../jsons/btrfly-blossom/notcashbutterfly"));
const linhaganhobtrfly_1 = __importDefault(require("../../jsons/btrfly-blossom/linhaganhobtrfly"));
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
exports.default = {
    getbutterfly(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.body.atk;
                const user = yield butterflyblossomfunctions_1.default.getuserbyatk(token);
                const jsonprimay = yield butterflyblossomfunctions_1.default.getjsonbutterfly(user[0].id);
                if (jsonprimay.length === 0) {
                    yield butterflyblossomfunctions_1.default.createjsonbutterfly(user[0].id);
                }
                const json = yield butterflyblossomfunctions_1.default.getjsonbutterfly(user[0].id);
                const jsonformatado = yield JSON.parse(json[0].json);
                res.send({
                    dt: {
                        fb: { is: true, bm: 100, t: 0.75 },
                        wt: { mw: 5, bw: 20, mgw: 35, smgw: 50 },
                        maxwm: null,
                        cs: [0.02, 0.2, 1],
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
            const client = yield (0, redis_1.createClient)()
                .on("error", (err) => console.log("Redis Client Error", err))
                .connect();
            try {
                const user = yield butterflyblossomfunctions_1.default.getuserbyatk(token);
                let bet = cs * ml * 20;
                let saldoatual = user[0].saldo;
                const gamename = "btrfly-blossom";
                (0, serverEvents_1.emitirEventoInterno)("att", {
                    token: token,
                    username: user[0].username,
                    bet: bet,
                    saldo: saldoatual,
                    rtp: user[0].rtp,
                    agentid: user[0].agentid,
                    gamecode: gamename,
                });
                ///PEGAR O AGENT
                const agent = yield allfunctions_1.default.getagentbyid(user[0].agentid);
                //CHAMA O CALBACK DE VERIFY BALANCE DO AGENT
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
                    res.send(yield notcashbutterfly_1.default.notcash(saldoatual, cs, ml));
                    return false;
                }
                else if (checkuserbalance.data.msg === "INSUFFICIENT_USER_FUNDS") {
                    res.send(yield notcashbutterfly_1.default.notcash(saldoatual, cs, ml));
                    return false;
                }
                //PEGA OS VALORES DO USER
                const retornado = user[0].valorganho;
                const valorapostado = user[0].valorapostado;
                //CALCULA O RTP DO USER
                const rtp = (retornado / valorapostado) * 100;
                console.log("RTP ATUAL " + rtp);
                console.log("BET ATUAL " + bet);
                //ENVIA ERRO CASO NÃO TENNHA SALDO
                if (saldoatual < bet) {
                    const semsaldo = yield notcashbutterfly_1.default.notcash(saldoatual, cs, ml);
                    res.send(semsaldo);
                    return false;
                }
                function returnumbersteps() {
                    return __awaiter(this, void 0, void 0, function* () {
                        var steps = yield client.json.get(`${token}:${gamename}`, { path: ["$.steps"] });
                        if (steps != null) {
                            steps = steps[0];
                        }
                        else {
                            steps = 0;
                        }
                        return steps;
                    });
                }
                //VERIFICA SE O USUARIO GANHOU OU PERDEU
                const resultadospin = yield allfunctions_1.default.calcularganho(bet, saldoatual, token, gamename);
                if (resultadospin.result === "perda") {
                    let newbalance = saldoatual - bet;
                    yield butterflyblossomfunctions_1.default.attsaldobyatk(token, newbalance);
                    yield butterflyblossomfunctions_1.default.atualizardebitado(token, bet);
                    yield butterflyblossomfunctions_1.default.atualizarapostado(token, bet);
                    const perdajson = yield linhaperdabtrfly_1.default.linhaperda();
                    let json = {
                        dt: {
                            si: {
                                wp: null,
                                wp3x5: null,
                                wpl: null,
                                ptbr: null,
                                lw: null,
                                lwm: null,
                                rl3x5: perdajson.rl3x5,
                                swl: null,
                                swlb: null,
                                nswl: null,
                                rswl: null,
                                rs: null,
                                fs: null,
                                sc: 1,
                                saw: 0.0,
                                tlw: 0.0,
                                gm: 1,
                                gmi: 0,
                                gml: perdajson.gml,
                                gwt: -1,
                                fb: null,
                                ctw: 0.0,
                                pmt: null,
                                cwc: 0,
                                fstc: null,
                                pcwc: 0,
                                rwsp: null,
                                hashr: "0:7;7;8;8;7#5;4;3;3;1#4;3;2;5;8#MV#12.0#MT#1#MG#0#",
                                ml: ml,
                                cs: cs,
                                rl: perdajson.rl,
                                sid: "1768293329693244928",
                                psid: "1768293329693244928",
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
                    yield butterflyblossomfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
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
                    const numeroAleatorio = 1;
                    const ganhojson = yield linhaganhobtrfly_1.default.linhaganho(numeroAleatorio);
                    console.log(yield returnumbersteps());
                    if ((yield client.json.get(token)) === null) {
                        yield client.json.set(`${token}:${gamename}`, "$", {
                            token,
                            key: numeroAleatorio,
                            steps: 0,
                        });
                    }
                    // const multplicador = await countrwsp(ganhojson[steps].rwsp)
                    // await lwchange(
                    //    ganhojson[steps].rwsp,
                    //    ganhojson[steps].lw,
                    //    cs,
                    //    ml,
                    // )
                    let valorganho = cs * ml * 1;
                    let wmvalue = 0;
                    let steps = yield client.json.get(`${token}`, { path: ["$.steps"] });
                    steps = steps[0];
                    console.log(steps);
                    console.log("VALOR GANHO " + valorganho);
                    const newbalance = saldoatual + valorganho - bet;
                    yield butterflyblossomfunctions_1.default.attsaldobyatk(token, newbalance);
                    yield butterflyblossomfunctions_1.default.atualizardebitado(token, bet);
                    yield butterflyblossomfunctions_1.default.atualizarapostado(token, bet);
                    yield butterflyblossomfunctions_1.default.atualizarganho(token, valorganho);
                    let json = {
                        dt: {
                            si: {
                                wp: ganhojson[steps].wp,
                                wp3x5: ganhojson[steps].wp3x5,
                                wpl: ganhojson[steps].wpl,
                                ptbr: ganhojson[steps].ptbr,
                                lw: ganhojson[steps].lw,
                                lwm: ganhojson[steps].lwm,
                                rl3x5: ganhojson[steps].rl3x5,
                                swl: ganhojson[steps].swl,
                                swlb: ganhojson[steps].swlb,
                                nswl: ganhojson[steps].nswl,
                                rswl: ganhojson[steps].rswl,
                                rs: ganhojson[steps].rs,
                                fs: ganhojson[steps].fs,
                                sc: 0,
                                saw: 1.95,
                                tlw: 1.95,
                                gm: 1,
                                gmi: 0,
                                gml: ganhojson[steps].gml,
                                gwt: -1,
                                fb: null,
                                ctw: 1.95,
                                pmt: null,
                                cwc: ganhojson[steps].cwc,
                                fstc: null,
                                pcwc: 1,
                                rwsp: ganhojson[steps].rwsp,
                                hashr: "0:8;6;6;8;7#7;3;4;5;2#4;3;8;0;7#R#4#022132#MV#3.00#MT#1#R#6#102032#MV#3.00#MT#1#MG#1.95#",
                                ml: 5,
                                cs: 0.03,
                                rl: ganhojson[steps].rl,
                                sid: "1768381452779453952",
                                psid: "1768381452779453952",
                                st: ganhojson[steps].st,
                                nst: ganhojson[steps].nst,
                                pf: 1,
                                aw: 1.95,
                                wid: 0,
                                wt: "C",
                                wk: "0_C",
                                wbn: null,
                                wfg: null,
                                blb: 99980.5,
                                blab: 99977.5,
                                bl: 99979.45,
                                tb: 3.0,
                                tbb: 3.0,
                                tw: 1.95,
                                np: -1.05,
                                ocr: null,
                                mr: null,
                                ge: [1, 11],
                            },
                        },
                        err: null,
                    };
                    yield butterflyblossomfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
                    const txnid = (0, uuid_1.v4)();
                    const dataFormatada = (0, moment_1.default)().toISOString();
                    let newsteps = Number(steps) + 1;
                    yield client.json.numIncrBy(`${token}`, "$.steps", newsteps);
                    if ((yield returnumbersteps()) >= Object.keys(ganhojson).length) {
                        yield client.json.del(`${token}:${gamename}`);
                    }
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
                if (resultadospin.result === "bonus" && resultadospin.gamecode === "bikini-paradise") {
                    const bonusjson = yield linhabonusbikini_1.default.linhabonus(resultadospin.json);
                    let call = yield allfunctions_1.default.getcallbyid(resultadospin.idcall);
                    if (call[0].steps === null && call[0].status === "pending") {
                        if (saldoatual < bet) {
                            const semsaldo = yield notcashbutterfly_1.default.notcash(saldoatual, cs, ml);
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
                    if (bonusjson[calltwo[0].steps].rwm != null) {
                        wmvalue = yield returnrwm(bonusjson[calltwo[0].steps].rwm);
                        valorganho = valorganho * wmvalue;
                    }
                    let newbalance = 0;
                    if (calltwo[0].steps === Object.keys(bonusjson).length - 1) {
                        newbalance = saldoatual - bet + valorganho;
                        yield butterflyblossomfunctions_1.default.attsaldobyatk(token, newbalance);
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
                    yield butterflyblossomfunctions_1.default.attawcall(calltwo[0].id, valorganho);
                    yield butterflyblossomfunctions_1.default.attsaldobyatk(token, newbalance);
                    yield butterflyblossomfunctions_1.default.atualizardebitado(token, bet);
                    yield butterflyblossomfunctions_1.default.atualizarapostado(token, bet);
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
                                orl: bonusjson[calltwo[0].steps].orl,
                                wm: wmvalue,
                                rwm: bonusjson[calltwo[0].steps].rwm,
                                wabm: valorganhonowm,
                                fs: bonusjson[calltwo[0].steps].fs,
                                sc: bonusjson[calltwo[0].steps].sc,
                                wppr: bonusjson[calltwo[0].steps].wppr,
                                gwt: -1,
                                fb: null,
                                ctw: valorganho,
                                pmt: null,
                                cwc: 0,
                                fstc: null,
                                pcwc: 0,
                                rwsp: bonusjson[calltwo[0].steps].rwsp,
                                hashr: "0:1;1;9;7;7#11;11;5;5;9#9;8;3;1;4#7;6;1;9;11#MV#15.0#MT#1#MG#0#",
                                ml: ml,
                                cs: cs,
                                rl: bonusjson[calltwo[0].steps].rl,
                                sid: "1767591680813235712",
                                psid: "1767591680813235712",
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
                                np: -valorganho,
                                ocr: null,
                                mr: null,
                                ge: [2, 1, 11],
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
                    yield butterflyblossomfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
                    res.send(json);
                }
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    },
};
