import promisePool from "../database"
import { RowDataPacket, ResultSetHeader } from "mysql2"

export default {
   async getuserbytoken(token: string) {
      const res = await promisePool.query<RowDataPacket[]>(`SELECT * FROM users WHERE token= ?`, [token])
      return res[0]
   },
   async getuserbyid(id: number) {
      const res = await promisePool.query<RowDataPacket[]>("SELECT * FROM users WHERE id = ?", [id])
      return res[0]
   },
   async getuserbyatk(atk: string) {
      const res = await promisePool.query<RowDataPacket[]>(`SELECT * FROM users WHERE atk= ?`, [atk])
      return res[0]
   },
   async getcall(id: number, game_code: string) {
      const res = await promisePool.query<RowDataPacket[]>("SELECT * FROM calls WHERE iduser = ? and status = 'pending' and gamecode= ?", [id, game_code])
      return res[0]
   },
   async getagentbyid(id: number) {
      const res = await promisePool.query<RowDataPacket[0]>("SELECT * FROM agents WHERE id = ?", [id])
      return res[0]
   },
   async getcallbyid(id: number) {
      const res = await promisePool.query<RowDataPacket[]>("SELECT * FROM calls WHERE id = ?", [id])
      return res[0]
   },
   async updatertp(token: string, rtp: number) {
      const res = await promisePool.query<ResultSetHeader[]>("UPDATE users SET rtp = ? WHERE token = ?", [rtp, token])

      return res[0]
   },
   async addcall(gamecode: string, iduser: number, json: number) {
      const res = await promisePool.query<ResultSetHeader[]>("INSERT INTO calls (iduser,gamecode,jsonname,bycall) VALUES (?,?,?,'system')", [iduser, gamecode, json])

      return res[0]
   },
   async updatestepscall(idcall: number, steps: number) {
      const res = await promisePool.query<ResultSetHeader[]>("UPDATE calls SET steps = ? WHERE id=?", [steps, idcall])
      return res[0]
   },
   async subtrairstepscall(idcall: number) {
      const res = await promisePool.query<RowDataPacket[]>("SELECT steps from calls WHERE id=?", [idcall])
      const call = res[0]
      const steps = call[0].steps
      const newsteps = steps - 1

      const res1 = await promisePool.query<ResultSetHeader[]>("UPDATE calls SET steps = ? WHERE id = ?", [newsteps, idcall])
      return res1[0]
   },
   async completecall(idcall: number) {
      const res = await promisePool.query<ResultSetHeader[]>('UPDATE calls SET status = "completed" WHERE id= ?', [idcall])
      return res[0]
   },
   async adicionarZeroAntes(numero: number) {
      return Number("0." + numero.toString())
   },
   async determinarResultado(probabilidadeGanho: number, probabilidadebonus: number, id: number, gamecode: string) {
      const resultadoAleatorio = Math.random()
      const callpending = await this.getcall(id, gamecode)
      let numeroAleatorio = 0

      if (callpending.length > 0 && callpending[0].status === "pending" && callpending[0].gamecode === `${gamecode}`) {
         return {
            result: "bonus",
            gamecode: gamecode,
            json: callpending[0].jsonname,
            idcall: callpending[0].id,
         }
      }

      if (resultadoAleatorio < probabilidadeGanho) {
         if (resultadoAleatorio < probabilidadebonus) {
            const user = await this.getuserbyid(id)

            if (user[0].isinfluencer === 1) {
               numeroAleatorio = Math.floor(Math.random() * 6) + 1
               await this.addcall(gamecode, id, numeroAleatorio)
            } else {
               numeroAleatorio = Math.floor(Math.random() * (12 - 7 + 1)) + 7
               await this.addcall(gamecode, id, numeroAleatorio)
            }
            return { result: "ganho" }
         } else {
            return { result: "ganho" }
         }
      } else {
         return { result: "perda" }
      }
   },
   async calcularganho(valorAposta: number, saldoatual: number, token: string, gamecode: string) {
      var user = await this.getuserbyatk(token)
      var agent = await this.getagentbyid(user[0].agentid)
      let probabilidadeGanho = await this.adicionarZeroAntes(agent[0].probganho)
      let probabilidadebonus = await this.adicionarZeroAntes(agent[0].probbonus)

      if (user[0].rtp >= 0 && user[0].rtp <= 30 && user[0].isinfluencer === 0) {
         probabilidadeGanho = await this.adicionarZeroAntes(agent[0].probganhortp)
      }

      if (saldoatual >= 100) {
         probabilidadeGanho = await this.adicionarZeroAntes(agent[0].probganhosaldo)
      }
      if (valorAposta >= 2) {
         probabilidadeGanho = await this.adicionarZeroAntes(agent[0].probganhoaposta)
      }
      if (user[0].isinfluencer === 1) {
         probabilidadeGanho = await this.adicionarZeroAntes(agent[0].probganhoinfluencer)
         probabilidadebonus = await this.adicionarZeroAntes(agent[0].probbonusinfluencer)
      }
      console.log("PROBABILIDADE DE GANHO ATUAL " + probabilidadeGanho)
      console.log("PROBABILIDADE DE BONUS ATUAL " + probabilidadebonus)

      const resultado = this.determinarResultado(probabilidadeGanho, probabilidadebonus, user[0].id, gamecode)

      return resultado
   },
}
