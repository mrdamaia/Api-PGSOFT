import { Request, Response } from "express"
import axios from "axios"
import logger from "../../logger"
import * as crypto from "crypto"
import { v4 } from "uuid"
import moment from "moment"
import allfunctions from "../../functions/allfunctions"
import apicontroller from "../apicontroller"
import { emitirEventoInterno, adicionarListener } from "../../serverEvents"
import "dotenv/config"
import ganeshagoldfunctions from "../../functions/ganesha-gold/ganeshagoldfunctions"
import linhaperdaganesha from "../../jsons/ganesha-gold/linhaperdaganesha"
import linhaganhoganesha from "../../jsons/ganesha-gold/linhaganhoganesha"
import linhabonusganesha from "../../jsons/ganesha-gold/linhabonusganesha"
import notcashganesha from "../../jsons/ganesha-gold/notcashganesha"

export default {
   async getganesha(req: Request, res: Response) {
      try {
         const token = req.body.atk

         const user = await ganeshagoldfunctions.getuserbyatk(token)
         const jsonprimay = await ganeshagoldfunctions.getjsonganesha(user[0].id)
         if (jsonprimay.length === 0) {
            await ganeshagoldfunctions.createjsonganesha(user[0].id)
         }
         const json = await ganeshagoldfunctions.getjsonganesha(user[0].id)
         const jsonformatado = await JSON.parse(json[0].json)

         res.send({
            dt: {
               fb: { is: false, bm: 5, t: 0.15 },
               wt: { mw: 2.5, bw: 5, mgw: 15, smgw: 50 },
               maxwm: null,
               cs: [0.01, 0.04, 0.2],
               ml: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
               mxl: 30,
               bl: user[0].saldo,
               inwe: false,
               iuwe: false,
               ls: {
                  si: jsonformatado.dt.si,
               },
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
         for (let i = 1; i <= 10; i++) {
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
      async function verificarValores(json: { [key: string]: any }): Promise<string[]> {
         const numerosVerificados: string[] = []
         // Iterar sobre os índices em 'mt'
         for (const chaveMT in json.mf.mt) {
            // Verificar se o valor correspondente em 'ms' é verdadeiro
            const valorMS = json.mf.ms[chaveMT]
            if (json.mf.ms[chaveMT] === true) {
               numerosVerificados.push(json.mf.mt[chaveMT])
            }
         }
         return numerosVerificados
      }
      try {
         const user = await ganeshagoldfunctions.getuserbyatk(token)
         let bet: number = cs * ml * 30
         let saldoatual: number = user[0].saldo
         const gamename = "ganesha-gold"

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
            res.send(await notcashganesha.notcash(saldoatual, cs, ml))
            return false
         } else if (checkuserbalance.data.msg === "INSUFFICIENT_USER_FUNDS") {
            res.send(await notcashganesha.notcash(saldoatual, cs, ml))
            return false
         }

         const retornado = user[0].valorganho
         const valorapostado = user[0].valorapostado

         const rtp = (retornado / valorapostado) * 100

         console.log("RTP ATUAL " + rtp)

         console.log("BET ATUAL " + bet)

         const resultadospin = await allfunctions.calcularganho(bet, saldoatual, token, gamename)
         if (resultadospin.result === "perda" || resultadospin.result === "ganho") {
            if (saldoatual < bet) {
               const semsaldo = await notcashganesha.notcash(saldoatual, cs, ml)
               res.send(semsaldo)
               return false
            }
         }

         if (resultadospin.result === "perda") {
            let newbalance = saldoatual - bet
            await ganeshagoldfunctions.attsaldobyatk(token, newbalance)
            await ganeshagoldfunctions.atualizardebitado(token, bet)
            await ganeshagoldfunctions.atualizarapostado(token, bet)
            const perdajson = await linhaperdaganesha.linhaperda()

            let json: any = {
               dt: {
                  si: {
                     wp: null,
                     lw: null,
                     ltw: 0.0,
                     snww: null,
                     fs: null,
                     sc: 1,
                     gwt: -1,
                     fb: null,
                     ctw: 0.0,
                     pmt: null,
                     cwc: 0,
                     fstc: null,
                     pcwc: 0,
                     rwsp: null,
                     hashr: "0:6;8;3;5;6#7;8;9;6;1#2;6;2;7;5#MV#9.00#MT#1#MG#0#",
                     ml: ml,
                     cs: cs,
                     rl: perdajson.rl,
                     sid: "1773390084810145280",
                     psid: "1773390084810145280",
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

            await ganeshagoldfunctions.savejsonspin(user[0].id, JSON.stringify(json))
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
            const ganhojson = await linhaganhoganesha.linhaganho(bet)
            const multplicador = await countrwsp(ganhojson.rwsp)
            await lwchange(ganhojson.rwsp, ganhojson.lw, cs, ml)
            let valorganho = cs * ml * multplicador

            // Chamar a função para verificar os valores

            const newbalance = saldoatual + valorganho - bet
            await ganeshagoldfunctions.attsaldobyatk(token, newbalance)
            await ganeshagoldfunctions.atualizardebitado(token, bet)
            await ganeshagoldfunctions.atualizarapostado(token, bet)
            await ganeshagoldfunctions.atualizarganho(token, valorganho)

            let json: any = {
               dt: {
                  si: {
                     wp: ganhojson.wp,
                     lw: ganhojson.lw,
                     ltw: valorganho,
                     snww: ganhojson.snww,
                     fs: null,
                     sc: 0,
                     gwt: -1,
                     fb: null,
                     ctw: valorganho,
                     pmt: null,
                     cwc: 1,
                     fstc: null,
                     pcwc: 1,
                     rwsp: ganhojson.rwsp,
                     hashr: "0:4;0;6;4;2#7;9;6;8;2#3;3;7;6;3#R#7#011022#MV#9.00#MT#1#MG#2.40#",
                     ml: ml,
                     cs: cs,
                     rl: ganhojson.rl,
                     sid: "1773391358779653632",
                     psid: "1773391358779653632",
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
            }

            await ganeshagoldfunctions.savejsonspin(user[0].id, JSON.stringify(json))

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
         if (resultadospin.result === "bonus" && resultadospin.gamecode === "ganesha-gold") {
            const bonusjson = await linhabonusganesha.linhabonus(resultadospin.json)
            let call = await allfunctions.getcallbyid(resultadospin.idcall)

            if (call[0].steps === null && call[0].status === "pending") {
               if (saldoatual < bet) {
                  const semsaldo = await notcashganesha.notcash(saldoatual, cs, ml)
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
            let valorganho = 0
            let valorganhonotbonus = 0

            if (bonusjson[calltwo[0].steps].wp != null) {
               multplicador = await countrwsp(bonusjson[calltwo[0].steps].rwsp)
               valorganho = cs * ml * multplicador
            }

            if (bonusjson[calltwo[0].steps].wp != null && (await allfunctions.getcallbyid(resultadospin.idcall))[0].steps != Object.keys(bonusjson).length - 1) {
               await lwchange(bonusjson[calltwo[0].steps].rwsp, bonusjson[calltwo[0].steps].lw, cs, ml)
               let wm = bonusjson[calltwo[0].steps].fs.wf.wm
               valorganhonotbonus = valorganho
               valorganho = valorganho * wm
               bonusjson[calltwo[0].steps].fs.wf.wa = valorganho
            }

            let newbalance = 0

            const txnid = v4()
            const dataFormatada: string = moment().toISOString()

            if (calltwo[0].steps === Object.keys(bonusjson).length - 1) {
               newbalance = saldoatual - bet + valorganho
               await ganeshagoldfunctions.attsaldobyatk(token, newbalance)

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

            await ganeshagoldfunctions.attawcall(calltwo[0].id, valorganho)

            await ganeshagoldfunctions.attsaldobyatk(token, newbalance)
            await ganeshagoldfunctions.atualizardebitado(token, bet)
            await ganeshagoldfunctions.atualizarapostado(token, bet)

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
                     ltw: valorganhonotbonus,
                     snww: bonusjson[calltwo[0].steps].snww,
                     fs: bonusjson[calltwo[0].steps].fs,
                     sc: 0,
                     gwt: -1,
                     fb: null,
                     ctw: valorganho,
                     pmt: null,
                     cwc: 0,
                     fstc: bonusjson[calltwo[0].steps].fstc,
                     pcwc: 0,
                     rwsp: bonusjson[calltwo[0].steps].rwsp,
                     hashr: "1:4;7;8;3;7#4;7;8;3;7#4;7;8;5;7#MV#0#MT#2#MG#0#",
                     ml: ml,
                     cs: cs,
                     rl: bonusjson[calltwo[0].steps].rl,
                     sid: "1773405403096219136",
                     psid: "1773405346569584128",
                     st: bonusjson[calltwo[0].steps].st,
                     nst: bonusjson[calltwo[0].steps].nst,
                     pf: bonusjson[calltwo[0].steps].pf,
                     aw: (await allfunctions.getcallbyid(resultadospin.idcall))[0].aw,
                     wid: valorganho,
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
                     ge: [2, 11],
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
            await ganeshagoldfunctions.savejsonspin(user[0].id, JSON.stringify(json))

            res.send(json)
         }
      } catch (error) {
         logger.error(error)
      }
   },
}
