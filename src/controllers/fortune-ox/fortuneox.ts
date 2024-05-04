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
import fortuneoxfunctions from "../../functions/fortune-ox/fortuneoxfunctions"
import linhabonusox from "../../jsons/fortune-ox/linhabonusox"
import linhaganhoox from "../../jsons/fortune-ox/linhaganhoox"
import linhaperdaox from "../../jsons/fortune-ox/linhaperdaox"
import notcashox from "../../jsons/fortune-ox/notcashox"

export default {
   async getox(req: Request, res: Response) {
      try {
         const token = req.body.atk

         const user = await fortuneoxfunctions.getuserbyatk(token)
         const jsonprimay = await fortuneoxfunctions.getjsonox(user[0].id)
         if (jsonprimay.length === 0) {
            await fortuneoxfunctions.createjsonox(user[0].id)
         }
         const json = await fortuneoxfunctions.getjsonox(user[0].id)
         const jsonformatado = await JSON.parse(json[0].json)

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
      try {
         const user = await fortuneoxfunctions.getuserbyatk(token)
         let bet: number = cs * ml * 10
         let saldoatual: number = user[0].saldo
         const gamename = "fortune-ox"

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
            res.send(await notcashox.notcash(saldoatual, cs, ml))
            return false
         } else if (checkuserbalance.data.msg === "INSUFFICIENT_USER_FUNDS") {
            res.send(await notcashox.notcash(saldoatual, cs, ml))
            return false
         }

         const retornado = user[0].valorganho
         const valorapostado = user[0].valorapostado

         const rtp = (retornado / valorapostado) * 100

         console.log("RTP ATUAL " + rtp)

         console.log("BET ATUAL " + bet)

         if (saldoatual < bet) {
            const semsaldo = await notcashox.notcash(saldoatual, cs, ml)
            res.send(semsaldo)
            return false
         }

         const resultadospin = await allfunctions.calcularganho(bet, saldoatual, token, gamename)

         if (resultadospin.result === "perda") {
            let newbalance = saldoatual - bet
            await fortuneoxfunctions.attsaldobyatk(token, newbalance)
            await fortuneoxfunctions.atualizardebitado(token, bet)
            await fortuneoxfunctions.atualizarapostado(token, bet)
            const perdajson = await linhaperdaox.linhaperda()

            let json: any = {
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
            }

            await fortuneoxfunctions.savejsonspin(user[0].id, JSON.stringify(json))
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
            const ganhojson = await linhaganhoox.linhaganho(bet)
            const multplicador = await countrwsp(ganhojson.rwsp)
            await lwchange(ganhojson.rwsp, ganhojson.lw, cs, ml)
            const valorganho = cs * ml * multplicador

            const newbalance = saldoatual + valorganho - bet
            await fortuneoxfunctions.attsaldobyatk(token, newbalance)
            await fortuneoxfunctions.atualizardebitado(token, bet)
            await fortuneoxfunctions.atualizarapostado(token, bet)
            await fortuneoxfunctions.atualizarganho(token, valorganho)

            function gerarBooleanoAleatorio(): boolean {
               // Gera um número aleatório entre 0 e 1
               const boolean = Math.floor(Math.random() * 10) + 1
               console.log("NUMERO DO BOOLEANO " + boolean)

               // Se o número for maior ou igual a 0.5, retorna true, caso contrário, retorna false
               return boolean >= 5
            }

            let json: any = {
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
            }

            await fortuneoxfunctions.savejsonspin(user[0].id, JSON.stringify(json))

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
         if (resultadospin.result === "bonus" && resultadospin.gamecode === "fortune-ox") {
            const bonusjson = await linhabonusox.linhabonus(resultadospin.json)
            let call = await allfunctions.getcallbyid(resultadospin.idcall)

            if (call[0].steps === null && call[0].status === "pending") {
               const steps = Object.keys(bonusjson).length - 1
               await allfunctions.updatestepscall(resultadospin.idcall, steps)
            }

            let calltwo = await allfunctions.getcallbyid(resultadospin.idcall)

            if (calltwo[0].steps === 0) {
               const multplicador = await countrwsp(bonusjson[calltwo[0].steps].rwsp)
               await lwchange(bonusjson[calltwo[0].steps].rwsp, bonusjson[calltwo[0].steps].lw, cs, ml)
               let valorganho = cs * ml * multplicador

               if (bonusjson[calltwo[0].steps].completed === true) {
                  valorganho = cs * ml * multplicador * 10
               }

               const newbalance = saldoatual + valorganho - bet
               await fortuneoxfunctions.attsaldobyatk(token, newbalance)
               await fortuneoxfunctions.atualizardebitado(token, bet)
               await fortuneoxfunctions.atualizarapostado(token, bet)
               await fortuneoxfunctions.atualizarganho(token, valorganho)

               let json: any = {
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
               }
               await fortuneoxfunctions.savejsonspin(user[0].id, JSON.stringify(json))
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
            }
            res.send(json)
         }
      } catch (error) {
         logger.error(error)
      }
   },
}
