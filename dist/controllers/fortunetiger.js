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
const logger_1 = __importDefault(require("../logger"));
const fortunetigerfunctions_1 = __importDefault(require("../functions/fortunetigerfunctions"));
const fortunejsons_1 = __importDefault(require("../jsons/fortune-tiger/fortunejsons"));
require("dotenv/config");
exports.default = {
    verifySession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.body.tk;
            try {
                const user = yield fortunetigerfunctions_1.default.getuserbytoken(token);
                res.send({
                    dt: {
                        oj: { jid: 0 },
                        pid: "bL0qYlMgZs",
                        pcd: "OKD15222646",
                        tk: user[0].atk,
                        st: 1,
                        geu: "game-api/fortune-tiger/",
                        lau: "/game-api/lobby/",
                        bau: "web-api/game-proxy/",
                        cc: "BRL",
                        cs: "R$",
                        nkn: "OKD15222646",
                        gm: [
                            {
                                gid: 126,
                                msdt: 1638432092000,
                                medt: 1638432092000,
                                st: 1,
                                amsg: "",
                                rtp: { df: { min: 96.81, max: 96.81 } },
                                mxe: 2500,
                                mxehr: 8960913,
                            },
                        ],
                        uiogc: {
                            bb: 1,
                            grtp: 1,
                            gec: 0,
                            cbu: 0,
                            cl: 0,
                            bf: 1,
                            mr: 0,
                            phtr: 0,
                            vc: 0,
                            bfbsi: 1,
                            bfbli: 1,
                            il: 0,
                            rp: 0,
                            gc: 1,
                            ign: 1,
                            tsn: 0,
                            we: 0,
                            gsc: 0,
                            bu: 0,
                            pwr: 0,
                            hd: 0,
                            et: 0,
                            np: 0,
                            igv: 0,
                            as: 0,
                            asc: 0,
                            std: 0,
                            hnp: 0,
                            ts: 0,
                            smpo: 0,
                            ivs: 1,
                            ir: 0,
                            hn: 1,
                        },
                        ec: [],
                        occ: { rurl: "", tcm: "", tsc: 0, ttp: 0, tlb: "", trb: "" },
                        ioph: "6028539ddfc8",
                    },
                    err: null,
                });
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    },
    getiger(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.body.atk;
                const user = yield fortunetigerfunctions_1.default.getuserbyatk(token);
                const json = yield fortunetigerfunctions_1.default.getjsontiger(user[0].id);
                const jsonformatado = yield JSON.parse(json[0].json);
                res.send({
                    dt: {
                        fb: { is: true, bm: 100, t: 8.0 },
                        wt: { mw: 5.0, bw: 20.0, mgw: 35.0, smgw: 50.0 },
                        maxwm: null,
                        cs: [0.08, 0.8, 3.0, 10.0],
                        ml: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        mxl: 5,
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
            try {
                const user = yield fortunetigerfunctions_1.default.getuserbyatk(token);
                const retornado = user[0].valorganho;
                const valorapostado = user[0].valorapostado;
                let bet = cs * ml * 5;
                let saldoatual = user[0].saldo;
                const rtp = (retornado / valorapostado) * 100;
                console.log(rtp);
                console.log("BET ATUAL " + bet);
                if (saldoatual < bet) {
                    const semsaldo = yield fortunejsons_1.default.notcash(saldoatual, cs, ml);
                    res.send(semsaldo);
                    return false;
                }
                const resultadospin = yield fortunetigerfunctions_1.default.calcularganho(bet, saldoatual, token);
                if (resultadospin.result === "perda") {
                    let newbalance = saldoatual - bet;
                    console.log(newbalance);
                    yield fortunetigerfunctions_1.default.attsaldobyatk(token, newbalance);
                    yield fortunetigerfunctions_1.default.atualizardebitado(token, bet);
                    yield fortunetigerfunctions_1.default.atualizarapostado(token, bet);
                    const perdajson = yield fortunejsons_1.default.linhaperda();
                    let json = {
                        dt: {
                            si: {
                                wc: 31,
                                ist: perdajson.ist,
                                itw: true,
                                fws: 0,
                                wp: null,
                                orl: perdajson.orl,
                                lw: null,
                                irs: false,
                                gwt: -1,
                                fb: null,
                                ctw: 0.0,
                                pmt: null,
                                cwc: 0,
                                fstc: null,
                                pcwc: 0,
                                rwsp: null,
                                hashr: "0:2;5;4#3;3;6#7;3;6#MV#3.0#MT#1#MG#0#",
                                ml: ml,
                                cs: cs,
                                rl: perdajson.orl,
                                sid: "1758600495495052800",
                                psid: "1758600495495052800",
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
                    yield fortunetigerfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
                    res.send(json);
                }
                if (resultadospin.result === "ganho") {
                    const ganhojson = yield fortunejsons_1.default.linhaganho(bet);
                    const multplicador = yield countrwsp(ganhojson.rwsp);
                    yield lwchange(ganhojson.rwsp, ganhojson.lw, cs, ml);
                    const valorganho = cs * ml * multplicador;
                    const newbalance = saldoatual + valorganho;
                    yield fortunetigerfunctions_1.default.attsaldobyatk(token, newbalance);
                    yield fortunetigerfunctions_1.default.atualizardebitado(token, bet);
                    yield fortunetigerfunctions_1.default.atualizarapostado(token, bet);
                    yield fortunetigerfunctions_1.default.atualizarganho(token, valorganho);
                    let json = {
                        dt: {
                            si: {
                                wc: 17,
                                ist: ganhojson.ist,
                                itw: false,
                                fws: 0,
                                wp: ganhojson.wp,
                                orl: ganhojson.orl,
                                lw: ganhojson.lw,
                                irs: false,
                                gwt: bet,
                                fb: null,
                                ctw: valorganho,
                                pmt: null,
                                cwc: bet,
                                fstc: null,
                                pcwc: bet,
                                rwsp: ganhojson.rwsp,
                                hashr: "0:6;4;6#6;4;6#6;4;4#MV#3.0#MT#1#MG#0#",
                                ml: ml,
                                cs: cs,
                                rl: ganhojson.orl,
                                sid: "1757973319175306752",
                                psid: "1757973319175306752",
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
                    yield fortunetigerfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
                    res.send(json);
                }
                if (resultadospin.result === "bonus") {
                    const cartajson = yield fortunejsons_1.default.linhacarta(resultadospin.json);
                    console.log(cartajson);
                    const multplicador = yield countrwsp(cartajson.rwsp);
                    yield lwchange(cartajson.rwsp, cartajson.lw, cs, ml);
                    const valorganho = cs * ml * multplicador;
                    const valor10 = valorganho * 10;
                    const newbalance = saldoatual + valor10;
                    yield fortunetigerfunctions_1.default.attsaldobyatk(token, newbalance);
                    yield fortunetigerfunctions_1.default.atualizardebitado(token, bet);
                    yield fortunetigerfunctions_1.default.atualizarapostado(token, bet);
                    yield fortunetigerfunctions_1.default.atualizarganho(token, valor10);
                    yield fortunetigerfunctions_1.default.completarcallid(resultadospin.idcall);
                    let json = {
                        dt: {
                            si: {
                                wc: cartajson.wc,
                                ist: cartajson.ist,
                                itw: cartajson.itw,
                                fws: cartajson.fws,
                                wp: cartajson.wp,
                                orl: cartajson.orl,
                                lw: cartajson.lw,
                                irs: cartajson.irs,
                                gwt: -1,
                                fb: null,
                                ctw: 0.0,
                                pmt: null,
                                cwc: 0,
                                fstc: null,
                                pcwc: 0,
                                rwsp: cartajson.rwsp,
                                hashr: "0:7;7;7#7;7;6#7;7;5#R#7#001020#MV#3.0#MT#1#R#7#021120#MV#3.0#MT#1#MG#0#",
                                ml: ml,
                                cs: cs,
                                rl: cartajson.orl,
                                sid: "1760194337369423360",
                                psid: "1760194337369423360",
                                st: 1,
                                nst: 1,
                                pf: 1,
                                aw: valor10,
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
                                tw: valor10,
                                np: -bet,
                                ocr: null,
                                mr: null,
                                ge: [1, 11],
                            },
                        },
                        err: null,
                    };
                    yield fortunetigerfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json));
                    res.send(json);
                }
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    },
};
