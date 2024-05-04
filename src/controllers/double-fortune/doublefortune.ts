import { Request, Response } from "express"
import axios from "axios"
import logger from "../../logger"
import * as crypto from "crypto"
import { v4 } from "uuid"
import { Server, Socket } from "socket.io"
import moment from "moment"

import "dotenv/config"

//IMPORT FUNCTIONS
import { emitirEventoInterno, adicionarListener } from "../../serverEvents"
import allfunctions from "../../functions/allfunctions"
import apicontroller from "../apicontroller"
import doublefortunefunctions from "../../functions/double-fortune/doublefortunefunctions"
//IMPORT LINHAS
import linhaperdadouble from "../../jsons/double-fortune/linhaperdadouble"
import linhaganhodouble from "../../jsons/double-fortune/linhaganhodouble"
import linhabonusdouble from "../../jsons/double-fortune/linhabonusdouble"
import notcashdouble from "../../jsons/double-fortune/notcashdouble"

export default {
   async getdouble(req: Request, res: Response) {
      try {
         const token = req.body.atk

         const user = await doublefortunefunctions.getuserbyatk(token)
         const jsonprimay = await doublefortunefunctions.getjsondouble(user[0].id)
         if (jsonprimay.length === 0) {
            await doublefortunefunctions.createjsondouble(user[0].id)
         }
         const json = await doublefortunefunctions.getjsondouble(user[0].id)
         const jsonformatado = await JSON.parse(json[0].json)

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
         })
      } catch (error) {
         logger.error(error)
      }
   },
   async spin(req: Request, res: Response) {
      let cs: number = req.body.cs
      let ml: number = req.body.ml
      const token = req.body.atk

      async function lwchange(json1: { [key: string]: any }, json2: { [key: string]: any }, cs: number, ml: number) {
         for (let chave in json1) {
            if (json1.hasOwnProperty(chave)) {
               const valor = json1[chave]
               const ganho = cs * ml * parseFloat(valor)

               for (let chave2 in json2) {
                  if (json2.hasOwnProperty(chave2)) {
                     json2[chave] = ganho
                  }
               }
            }
         }
      }
      async function returnrwspnotnull(json: { [key: string]: any }) {
         let chavereturn: string = ""
         for (const chave in json) {
            if (json[chave] != null) {
               chavereturn = chave
            }
         }
         return chavereturn
      }
      async function countrwspzero(json: { [key: string]: any }) {
         let multplicador: number = 0
         for (let i = 1; i <= 30; i++) {
            const chave = i.toString()
            if (json.hasOwnProperty(chave)) {
               multplicador = multplicador + parseFloat(json[chave])
            }
         }
         return multplicador
      }
      async function countrwspone(json: { [key: string]: any }) {
         let multplicador: number = 0
         for (let i = 1; i <= 30; i++) {
            const chave = i.toString()
            if (json.hasOwnProperty(chave)) {
               multplicador = multplicador + parseFloat(json[chave])
            }
         }
         return multplicador
      }
      async function countkeyrwspnull(json: { [key: string]: any }) {
         let count: number = 0
         for (let chave in json) {
            if (json[chave] === null) {
               count = count + 1
            }
         }
         return count
      }

      async function countrwsp(json: { [key: string]: any }) {
         let multplicador: number = 0
         for (let i = 1; i <= 30; i++) {
            const chave = i.toString()
            if (json.hasOwnProperty(chave)) {
               multplicador = multplicador + parseFloat(json[chave])
            }
         }
         return multplicador
      }
      async function gerarNumeroUnico() {
         return crypto.randomBytes(8).toString("hex")
      }
      async function returnrwm(json: { [key: string]: any }) {
         let value: number = 0
         for (let chave in json) {
            if (json.hasOwnProperty(chave)) {
               value = value + parseFloat(json[chave])
            }
         }
         return value
      }
      try {
         const user = await doublefortunefunctions.getuserbyatk(token)
         let bet: number = cs * ml * 30
         console.log(bet)
         let saldoatual: number = user[0].saldo
         const gamename = "double-fortune"

         emitirEventoInterno("att", {
            token: token,
            username: user[0].username,
            bet: bet,
            saldo: saldoatual,
            rtp: user[0].rtp,
            agentid: user[0].agentid,
            gamecode: gamename,
         })

         const agent = await allfunctions.getagentbyid(user[0].agentid)

         const checkuserbalance = await axios({
            maxBodyLength: Infinity,
            method: "POST",
            url: `${agent[0].callbackurl}gold_api/user_balance`,
            headers: {
               "Content-Type": "application/json",
            },
            data: {
               user_code: user[0].username,
            },
         })

         if (checkuserbalance.data.msg === "INVALID_USER") {
            res.send(await notcashdouble.notcash(saldoatual, cs, ml))
            return false
         } else if (checkuserbalance.data.msg === "INSUFFICIENT_USER_FUNDS") {
            res.send(await notcashdouble.notcash(saldoatual, cs, ml))
            return false
         }

         const retornado = user[0].valorganho
         const valorapostado = user[0].valorapostado

         const rtp = (retornado / valorapostado) * 100

         console.log("RTP ATUAL " + rtp)

         console.log("BET ATUAL " + bet)

         if (saldoatual < bet) {
            const semsaldo = await notcashdouble.notcash(saldoatual, cs, ml)
            res.send(semsaldo)
            return false
         }

         const resultadospin = await allfunctions.calcularganho(bet, saldoatual, token, gamename)

         if (resultadospin.result === "perda") {
            let newbalance = saldoatual - bet
            await doublefortunefunctions.attsaldobyatk(token, newbalance)
            await doublefortunefunctions.atualizardebitado(token, bet)
            await doublefortunefunctions.atualizarapostado(token, bet)
            const perdajson = await linhaperdadouble.linhaperda()

            let json: any = {
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
            }
            await doublefortunefunctions.savejsonspin(user[0].id, JSON.stringify(json))
            const txnid = v4()
            const dataFormatada: string = moment().toISOString()
            await apicontroller.callbackgame({
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
                  round_id: await gerarNumeroUnico(),
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
            })
            res.send(json)
         }
         if (resultadospin.result === "ganho") {
            const ganhojson = await linhaganhodouble.linhaganho(bet)
            const multplicador = await countrwsp(ganhojson.rwsp[0])
            await lwchange(ganhojson.rwsp[0], ganhojson.lw, cs, ml)
            let valorganho = cs * ml * multplicador

            console.log("VALOR GANHO " + valorganho)
            // if (ganhojson.rwm != null) {
            //    wmvalue = await returnrwm(ganhojson.rwm)
            //    valorganho = valorganho * wmvalue
            // }

            ganhojson.slw[0] = valorganho

            const newbalance = saldoatual + valorganho - bet
            await doublefortunefunctions.attsaldobyatk(token, newbalance)
            await doublefortunefunctions.atualizardebitado(token, bet)
            await doublefortunefunctions.atualizarapostado(token, bet)
            await doublefortunefunctions.atualizarganho(token, valorganho)

            let json: any = {
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
            }
            await doublefortunefunctions.savejsonspin(user[0].id, JSON.stringify(json))

            const txnid = v4()
            const dataFormatada: string = moment().toISOString()

            await apicontroller.callbackgame({
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
                  round_id: await gerarNumeroUnico(),
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
            })
            res.send(json)
         }
         if (resultadospin.result === "bonus" && resultadospin.gamecode === "double-fortune") {
            const bonusjson = await linhabonusdouble.linhabonus(resultadospin.json)
            let call = await allfunctions.getcallbyid(resultadospin.idcall)

            if (call[0].steps === null && call[0].status === "pending") {
               if (saldoatual < bet) {
                  const semsaldo = await notcashdouble.notcash(saldoatual, cs, ml)
                  res.send(semsaldo)
                  return false
               }
            }

            if (call[0].steps === null && call[0].status === "pending") {
               const steps = Object.keys(bonusjson).length - 1
               await allfunctions.updatestepscall(resultadospin.idcall, steps)
            }

            let calltwo = await allfunctions.getcallbyid(resultadospin.idcall)

            if (calltwo[0].steps === 0) {
               await allfunctions.completecall(calltwo[0].id)
            }

            let multplicador = 0

            if (bonusjson[calltwo[0].steps].lw != null) {
               await lwchange(bonusjson[calltwo[0].steps].rwsp[0], bonusjson[calltwo[0].steps].fs.lw, cs, ml)
            }
            if (bonusjson[calltwo[0].steps].fs.lw != null) {
               await lwchange(bonusjson[calltwo[0].steps].rwsp[1], bonusjson[calltwo[0].steps].lw, cs, ml)
            }

            let wmvalue = 0

            const txnid = v4()
            const dataFormatada: string = moment().toISOString()

            let valorganho = 0

            if (bonusjson[calltwo[0].steps].rwsp[0] != null || (bonusjson[calltwo[0].steps].rwsp[1] != null && (await countkeyrwspnull(bonusjson[calltwo[0].steps].rwsp)) > 0)) {
               let chave = await returnrwspnotnull(bonusjson[calltwo[0].steps].rwsp)
               let rwpschave = await countrwsp(bonusjson[calltwo[0].steps].rwsp[chave])
               valorganho = cs * ml * rwpschave

               if (bonusjson[calltwo[0].steps].fs.slw != null) {
                  bonusjson[calltwo[0].steps].fs.slw[chave] = valorganho
               }
            }

            if ((await countkeyrwspnull(bonusjson[calltwo[0].steps].rwsp)) === 0 && (await allfunctions.getcallbyid(resultadospin.idcall))[0].steps != Object.keys(bonusjson).length - 1) {
               let multzero = 0
               let multone = 0
               if (bonusjson[calltwo[0].steps].rwsp[0] != null) {
                  multzero = await countrwspzero(bonusjson[calltwo[0].steps].rwsp[0])
               }
               if (bonusjson[calltwo[0].steps].rwsp[1] != null) {
                  multone = await countrwspone(bonusjson[calltwo[0].steps].rwsp[1])
               }

               let valorganhorolozero = cs * ml * multzero
               let valorganhoroloone = cs * ml * multone
               console.log("VALOR GANHO ROLO 0 " + valorganhorolozero)
               console.log("VALOR GANHO ROLO 1 " + valorganhoroloone)

               bonusjson[calltwo[0].steps].slw[0] = valorganhoroloone
               bonusjson[calltwo[0].steps].slw[1] = valorganhoroloone * 8

               if (bonusjson[calltwo[0].steps].fs != null && bonusjson[calltwo[0].steps].fs.slw != null) {
                  bonusjson[calltwo[0].steps].fs.slw[0] = valorganhorolozero
                  bonusjson[calltwo[0].steps].fs.slw[1] = valorganhorolozero * 8
               }
               valorganho = valorganhorolozero * 8 + valorganhoroloone * 8
            }
            console.log("VALOR GANHO " + valorganho)

            let newbalance = 0

            if (calltwo[0].steps === Object.keys(bonusjson).length - 1) {
               newbalance = saldoatual - bet + valorganho
               await doublefortunefunctions.attsaldobyatk(token, newbalance)

               await apicontroller.callbackgame({
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
                     round_id: await gerarNumeroUnico(),
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
               })
            }

            newbalance = saldoatual + valorganho

            if (calltwo[0].steps === 0) {
               newbalance = saldoatual + valorganho - bet
            }

            await doublefortunefunctions.attawcall(calltwo[0].id, valorganho)

            await doublefortunefunctions.attsaldobyatk(token, newbalance)
            await doublefortunefunctions.atualizardebitado(token, bet)
            await doublefortunefunctions.atualizarapostado(token, bet)

            if (calltwo[0].steps > 0) {
               await allfunctions.subtrairstepscall(resultadospin.idcall)
            }

            if (bonusjson[calltwo[0].steps].fs.hasOwnProperty("aw")) {
               bonusjson[calltwo[0].steps].fs["aw"] = (await allfunctions.getcallbyid(resultadospin.idcall))[0].aw
            }

            let json: any = {
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
                     aw: (await allfunctions.getcallbyid(resultadospin.idcall))[0].aw,
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
            }
            await apicontroller.callbackgame({
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
                  round_id: await gerarNumeroUnico(),
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
            })
            await doublefortunefunctions.savejsonspin(user[0].id, JSON.stringify(json))

            res.send(json)
         }
      } catch (error) {
         logger.error(error)
      }
   },
}
