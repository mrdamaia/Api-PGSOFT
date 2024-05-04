import { Request, Response } from "express"
import axios from "axios"
import logger from "../../logger"
import * as crypto from "crypto"
import { v4 } from "uuid"
import { Server, Socket } from "socket.io"
import moment from "moment"

import dragontigerluckfunctions from "../../functions/dragon-tiger-luck/dragontigerluckfunctions"
import allfunctions from "../../functions/allfunctions"
import apicontroller from "../apicontroller"
import { emitirEventoInterno, adicionarListener } from "../../serverEvents"
import linhaganhodragontigerluck from "../../jsons/dragon-tiger-luck/linhaganhodragontigerluck"
import linhaperdadragontigerluck from "../../jsons/dragon-tiger-luck/linhaperdadragontigerluck"
import linhabonusdragontigerluck from "../../jsons/dragon-tiger-luck/linhabonusdragontigerluck"
import notcashdragontigerluck from "../../jsons/dragon-tiger-luck/notcashdragontigerluck"

import "dotenv/config"

export default {
   async getdragontiger(req: Request, res: Response) {
      try {
         const token = req.body.atk

         const user = await dragontigerluckfunctions.getuserbyatk(token)
         const jsonprimay = await dragontigerluckfunctions.getjsondragontigerlucky(user[0].id)
         if (jsonprimay.length === 0) {
            await dragontigerluckfunctions.createjsondragontigerlucky(user[0].id)
         }
         const json = await dragontigerluckfunctions.getjsondragontigerlucky(user[0].id)
         const jsonformatado = await JSON.parse(json[0].json)

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
      async function encontrarRepetido(json: number[]): Promise<number | null> {
         const contador: { [key: number]: number } = {}

         // Contar a ocorrência de cada número
         for (const numero of json) {
            contador[numero] = (contador[numero] || 0) + 1
         }

         // Verificar se algum número se repete três vezes
         for (const numero in contador) {
            if (contador[numero] === 3) {
               return parseInt(numero)
            }
         }

         // Se nenhum número se repetir três vezes, retornar null
         return null
      }
      try {
         const user = await dragontigerluckfunctions.getuserbyatk(token)
         let bet: number = cs * ml * 2
         let saldoatual: number = user[0].saldo
         const gamename = "dragon-tiger-luck"

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
            res.send(await notcashdragontigerluck.notcash(saldoatual, cs, ml))
            return false
         } else if (checkuserbalance.data.msg === "INSUFFICIENT_USER_FUNDS") {
            res.send(await notcashdragontigerluck.notcash(saldoatual, cs, ml))
            return false
         }

         const retornado = user[0].valorganho
         const valorapostado = user[0].valorapostado

         const rtp = (retornado / valorapostado) * 100

         console.log("RTP ATUAL " + rtp)

         console.log("BET ATUAL " + bet)

         if (saldoatual < bet) {
            const semsaldo = await notcashdragontigerluck.notcash(saldoatual, cs, ml)
            res.send(semsaldo)
            return false
         }

         const resultadospin = await allfunctions.calcularganho(bet, saldoatual, token, gamename)

         if (resultadospin.result === "perda") {
            let newbalance = saldoatual - bet
            await dragontigerluckfunctions.attsaldobyatk(token, newbalance)
            await dragontigerluckfunctions.atualizardebitado(token, bet)
            await dragontigerluckfunctions.atualizarapostado(token, bet)
            const perdajson = await linhaperdadragontigerluck.linhaperda()

            let json: any = {
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
            }

            await dragontigerluckfunctions.savejsonspin(user[0].id, JSON.stringify(json))
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
            const ganhojson = await linhaganhodragontigerluck.linhaganho(bet)
            let multplicador: number = 0
            // await lwchange(ganhojson.rwsp, ganhojson.lw, cs, ml)
            let valorganho = 0

            if (ganhojson.mrl[1].wp != null) {
               const isrepetido = await encontrarRepetido(ganhojson.mrl[1].orl)
               console.log("REPETIDO " + isrepetido)
               if (isrepetido === null) {
                  multplicador = 5
               } else if (isrepetido === 3) {
                  multplicador = 25
               } else if (isrepetido === 2) {
                  multplicador = 50
               } else if (isrepetido === 1) {
                  multplicador = 100
               }

               valorganho = cs * ml * multplicador
               ganhojson.mrl[1].lw[1] = valorganho
               ganhojson.mrl[1].tw = valorganho
            }

            if (ganhojson.mrl[2].wp != null) {
               const isrepetido = await encontrarRepetido(ganhojson.mrl[2].orl)
               console.log("REPETIDO " + isrepetido)
               if (isrepetido === null) {
                  multplicador = 5
               } else if (isrepetido === 3) {
                  multplicador = 25
               } else if (isrepetido === 2) {
                  multplicador = 50
               } else if (isrepetido === 1) {
                  multplicador = 100
               }

               valorganho = cs * ml * multplicador
               ganhojson.mrl[2].lw[1] = valorganho
               ganhojson.mrl[2].tw = valorganho
            }

            const newbalance = saldoatual + valorganho - bet
            await dragontigerluckfunctions.attsaldobyatk(token, newbalance)
            await dragontigerluckfunctions.atualizardebitado(token, bet)
            await dragontigerluckfunctions.atualizarapostado(token, bet)
            await dragontigerluckfunctions.atualizarganho(token, valorganho)

            let json: any = {
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
            }

            await dragontigerluckfunctions.savejsonspin(user[0].id, JSON.stringify(json))

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
         if (resultadospin.result === "bonus" && resultadospin.gamecode === "dragon-tiger-luck") {
            const bonusjson = await linhabonusdragontigerluck.linhabonus(resultadospin.json)
            let call = await allfunctions.getcallbyid(resultadospin.idcall)

            // if (call[0].steps === null && call[0].status === "pending") {
            //    const steps = Object.keys(cartajson).length - 1
            //    await allfunctions.updatestepscall(resultadospin.idcall, steps)
            // }

            if (call[0].steps === null && call[0].status === "pending") {
               if (saldoatual < bet) {
                  const semsaldo = await notcashdragontigerluck.notcash(saldoatual, cs, ml)
                  res.send(semsaldo)
                  return false
               }
            }

            let multplicador = 0
            let valorganho = cs * ml * multplicador
            let multplicadormrl1 = 0
            let multplicadormrl2 = 0

            if (bonusjson.mrl[1].wp != null && bonusjson.mrl[2].wp != null) {
               const isrepetidomrl1 = await encontrarRepetido(bonusjson.mrl[1].orl)

               if (isrepetidomrl1 === null) {
                  multplicadormrl1 = 5
               } else if (isrepetidomrl1 === 3) {
                  multplicadormrl1 = 25
               } else if (isrepetidomrl1 === 2) {
                  multplicadormrl1 = 50
               } else if (isrepetidomrl1 === 1) {
                  multplicadormrl1 = 100
               }

               const isrepetidomrl2 = await encontrarRepetido(bonusjson.mrl[2].orl)

               if (isrepetidomrl2 === null) {
                  multplicadormrl2 = 5
               } else if (isrepetidomrl2 === 3) {
                  multplicadormrl2 = 25
               } else if (isrepetidomrl2 === 2) {
                  multplicadormrl2 = 50
               } else if (isrepetidomrl2 === 1) {
                  multplicadormrl2 = 100
               }
            }
            let valorganhomrl1 = cs * ml * multplicadormrl1

            bonusjson.mrl[1].lw[1] = valorganhomrl1
            bonusjson.mrl[1].tw = valorganhomrl1

            let valorganhomrl2 = cs * ml * multplicadormrl2

            bonusjson.mrl[2].lw[1] = valorganhomrl2
            bonusjson.mrl[2].tw = valorganhomrl2

            valorganho = (valorganhomrl1 + valorganhomrl2) * 2

            const newbalance = saldoatual + valorganho - bet
            await dragontigerluckfunctions.attsaldobyatk(token, newbalance)
            await dragontigerluckfunctions.atualizardebitado(token, bet)
            await dragontigerluckfunctions.atualizarapostado(token, bet)
            await dragontigerluckfunctions.atualizarganho(token, valorganho)

            let calltwo = await allfunctions.getcallbyid(resultadospin.idcall)

            let json: any = {
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
            }

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
                  is_call: false,
                  user_before_balance: user[0].saldo,
                  user_after_balance: newbalance,
                  agent_before_balance: 100,
                  agent_after_balance: 100,
                  created_at: dataFormatada,
               },
            })
            await allfunctions.completecall(calltwo[0].id)

            res.send(json)
         }
      } catch (error) {
         logger.error(error)
      }
   },
}
