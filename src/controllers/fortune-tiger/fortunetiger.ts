import { Request, Response } from "express"
import axios from "axios"
import logger from "../../logger"
import * as crypto from "crypto"
import { v4 } from "uuid"
import { Server, Socket } from "socket.io"
import moment from "moment"
import fortunefunctions from "../../functions/fortune-tiger/fortunetigerfunctions"
import allfunctions from "../../functions/allfunctions"
import apicontroller from "../apicontroller"
import { emitirEventoInterno, adicionarListener } from "../../serverEvents"
import linhaganhotiger from "../../jsons/fortune-tiger/linhaganhotiger"
import linhaperdatiger from "../../jsons/fortune-tiger/linhaperdatiger"
import linhabonustiger from "../../jsons/fortune-tiger/linhabonustiger"
import notcashtiger from "../../jsons/fortune-tiger/notcashtiger"

import "dotenv/config"

export default {
   async getiger(req: Request, res: Response) {
      try {
         const token = req.body.atk

         const user = await fortunefunctions.getuserbyatk(token)
         const jsonprimay = await fortunefunctions.getjsontiger(user[0].id)
         if (jsonprimay.length === 0) {
            await fortunefunctions.createjsontiger(user[0].id)
         }
         const json = await fortunefunctions.getjsontiger(user[0].id)
         const jsonformatado = await JSON.parse(json[0].json)

         res.send({
            dt: {
               fb: null,
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
         })
      } catch (error) {
         logger.error(error)
      }
   },
   async spin(req: Request, res: Response) {
      let cs: number = req.body.cs
      let ml: number = req.body.ml
      const token = req.body.atk

      async function lwchange(
         json1: { [key: string]: any },
         json2: { [key: string]: any },
         cs: number,
         ml: number,
      ) {
         for (let chave in json1) {
            if (json1.hasOwnProperty(chave)) {
               const valor = json1[chave]
               const ganho = cs * ml * parseFloat(valor)
               // Verifica se a chave existe no segundo JSON
               for (let chave2 in json2) {
                  if (json2.hasOwnProperty(chave2)) {
                     // Altera o valor correspondente no segundo JSON
                     json2[chave] = ganho
                  }
               }
            }
         }
      }

      async function countrwsp(json: { [key: string]: any }) {
         let multplicador: number = 0
         for (let i = 1; i <= 9; i++) {
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
      try {
         const user = await fortunefunctions.getuserbyatk(token)
         let bet: number = cs * ml * 5
         console.log(bet)
         let saldoatual: number = user[0].saldo
         const gamename = "fortune-tiger"

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
            res.send(await notcashtiger.notcash(saldoatual, cs, ml))
            return false
         } else if (checkuserbalance.data.msg === "INSUFFICIENT_USER_FUNDS") {
            res.send(await notcashtiger.notcash(saldoatual, cs, ml))
            return false
         }

         const retornado = user[0].valorganho
         const valorapostado = user[0].valorapostado

         const rtp = (retornado / valorapostado) * 100

         console.log("RTP ATUAL " + rtp)

         console.log("BET ATUAL " + bet)

         if (saldoatual < bet) {
            const semsaldo = await notcashtiger.notcash(saldoatual, cs, ml)
            res.send(semsaldo)
            return false
         }

         const resultadospin = await allfunctions.calcularganho(bet, saldoatual, token, gamename)

         if (resultadospin.result === "perda") {
            let newbalance = saldoatual - bet
            await fortunefunctions.attsaldobyatk(token, newbalance)
            await fortunefunctions.atualizardebitado(token, bet)
            await fortunefunctions.atualizarapostado(token, bet)
            const perdajson = await linhaperdatiger.linhaperda()

            let json: any = {
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
            }

            await fortunefunctions.savejsonspin(user[0].id, JSON.stringify(json))
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
            const ganhojson = await linhaganhotiger.linhaganho(bet)
            const multplicador = await countrwsp(ganhojson.rwsp)
            await lwchange(ganhojson.rwsp, ganhojson.lw, cs, ml)
            const valorganho = cs * ml * multplicador

            const newbalance = saldoatual + valorganho - bet
            await fortunefunctions.attsaldobyatk(token, newbalance)
            await fortunefunctions.atualizardebitado(token, bet)
            await fortunefunctions.atualizarapostado(token, bet)
            await fortunefunctions.atualizarganho(token, valorganho)

            let json: any = {
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
            }

            await fortunefunctions.savejsonspin(user[0].id, JSON.stringify(json))

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
         if (resultadospin.result === "bonus" && resultadospin.gamecode === "fortune-tiger") {
            const cartajson = await linhabonustiger.linhacarta(resultadospin.json)
            let call = await allfunctions.getcallbyid(resultadospin.idcall)

            if (call[0].steps === null && call[0].status === "pending") {
               const steps = Object.keys(cartajson).length - 1
               await allfunctions.updatestepscall(resultadospin.idcall, steps)
            }

            let calltwo = await allfunctions.getcallbyid(resultadospin.idcall)

            if (calltwo[0].steps === 0) {
               const multplicador = await countrwsp(cartajson[calltwo[0].steps].rwsp)
               await lwchange(
                  cartajson[calltwo[0].steps].rwsp,
                  cartajson[calltwo[0].steps].lw,
                  cs,
                  ml,
               )
               let valorganho = cs * ml * multplicador

               if (cartajson[calltwo[0].steps].completed === true) {
                  valorganho = cs * ml * multplicador * 10
               }

               const newbalance = saldoatual + valorganho - bet
               await fortunefunctions.attsaldobyatk(token, newbalance)
               await fortunefunctions.atualizardebitado(token, bet)
               await fortunefunctions.atualizarapostado(token, bet)
               await fortunefunctions.atualizarganho(token, valorganho)

               let json: any = {
                  dt: {
                     si: {
                        wc: 0,
                        ist: cartajson[calltwo[0].steps].ist,
                        itw: cartajson[calltwo[0].steps].itw,
                        fws: cartajson[calltwo[0].steps].fws,
                        wp: cartajson[calltwo[0].steps].wp,
                        orl: cartajson[calltwo[0].steps].orl,
                        lw: cartajson[calltwo[0].steps].lw,
                        irs: cartajson[calltwo[0].steps].irs,
                        gwt: 3,
                        fb: null,
                        ctw: valorganho,
                        pmt: null,
                        cwc: 1,
                        fstc: { "4": 2 },
                        pcwc: 0,
                        rwsp: cartajson[calltwo[0].steps].rwsp,
                        hashr: "2:7;7;7#7;7;7#7;7;7#R#7#011121#MV#0#MT#1#R#7#001020#MV#0#MT#1#R#7#021222#MV#0#MT#1#R#7#001122#MV#0#MT#1#R#7#021120#MV#0#MT#1#MG#90.0#",
                        ml: cs,
                        cs: ml,
                        rl: cartajson[calltwo[0].steps].rl,
                        sid: "1761174298456686080",
                        psid: "1761174260091387392",
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
                        ge: [1, 11],
                     },
                  },
                  err: null,
               }
               await fortunefunctions.savejsonspin(user[0].id, JSON.stringify(json))
               await allfunctions.completecall(calltwo[0].id)

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
               })
               res.send(json)
               return false
            }

            await allfunctions.subtrairstepscall(resultadospin.idcall)
            let json: any = {
               dt: {
                  si: {
                     wc: 103,
                     ist: cartajson[calltwo[0].steps].ist,
                     itw: cartajson[calltwo[0].steps].itw,
                     fws: cartajson[calltwo[0].steps].fws,
                     wp: cartajson[calltwo[0].steps].wp,
                     orl: cartajson[calltwo[0].steps].orl,
                     lw: cartajson[calltwo[0].steps].lw,
                     irs: cartajson[calltwo[0].steps].irs,
                     gwt: -1,
                     fb: null,
                     ctw: 0.0,
                     pmt: null,
                     cwc: 0,
                     fstc: null,
                     pcwc: 0,
                     rwsp: cartajson[calltwo[0].steps].rwsp,
                     hashr: "0:6;3;7#4;7;7#7;4;7#R#7#021120#MV#3.0#MT#1#MG#0#",
                     ml: cs,
                     cs: ml,
                     rl: cartajson[calltwo[0].steps].rl,
                     sid: "1761174260091387392",
                     psid: "1761174260091387392",
                     st: 1,
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
                     ge: [4, 11],
                  },
               },
               err: null,
            }
            res.send(json)
         }
      } catch (error) {
         logger.error(error)
      }
   },
}
