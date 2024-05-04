import promisePool from "../../database"
import { RowDataPacket, ResultSetHeader } from "mysql2"

export default {
   async getuserbytoken(token: string) {
      const res = await promisePool.query<RowDataPacket[]>(
         `SELECT * FROM users WHERE token= ?`,
         [token],
      )
      return res[0]
   },
   async getuserbyatk(atk: string) {
      const res = await promisePool.query<RowDataPacket[]>(
         `SELECT * FROM users WHERE atk= ?`,
         [atk],
      )
      return res[0]
   },
   async attsaldobyatk(atk: string, novosaldo: number) {
      const res = await promisePool.query<ResultSetHeader>(
         `UPDATE users SET saldo = '${novosaldo}' WHERE atk= '${atk}'`,
      )
      return res[0]
   },

   async atualizarapostado(atk: string, bet: number) {
      const user = await this.getuserbyatk(atk)
      const apostado = user[0].valorapostado
      const novoapostado = apostado + bet

      const res = await promisePool.query<ResultSetHeader>(
         `UPDATE users SET valorapostado = '${novoapostado}' WHERE atk='${atk}'`,
      )

      return res[0]
   },
   async atualizardebitado(atk: string, bet: number) {
      const user = await this.getuserbyatk(atk)
      const valordebitado = user[0].valordebitado
      const novordebitado = valordebitado + bet

      const res = await promisePool.query<ResultSetHeader>(
         `UPDATE users SET valordebitado = '${novordebitado}' WHERE atk='${atk}'`,
      )

      return res[0]
   },
   async atualizarganho(atk: string, ganho: number) {
      const user = await this.getuserbyatk(atk)
      const valorganho = user[0].valorganho
      const novodeganho = valorganho + ganho

      const res = await promisePool.query<ResultSetHeader>(
         `UPDATE users SET valorganho = '${novodeganho}' WHERE atk='${atk}'`,
      )

      return res[0]
   },
   async getcall(id: number) {
      const res = await promisePool.query<RowDataPacket[]>(
         "SELECT * FROM calls WHERE iduser = ?",
         [id],
      )
      return res[0]
   },
   async completarcallid(id: number) {
      const newstatus = "completed"
      const res = await promisePool.query<ResultSetHeader>(
         "UPDATE calls SET status = ? WHERE id = ?",
         [newstatus, id],
      )
      return res[0]
   },
   async savejsonspin(id: number, json: any) {
      const res = await promisePool.query<ResultSetHeader>(
         "UPDATE fortunetigerplayerjson SET JSON = ? WHERE id = ?",
         [json, id],
      )
      return res[0]
   },
   async getjsontiger(id: number) {
      const res = await promisePool.query<RowDataPacket[]>(
         "SELECT * FROM fortunetigerplayerjson WHERE id=?",
         [id],
      )
      return res[0]
   },
   async createjsontiger(id: number) {
      const res = await promisePool.query<ResultSetHeader>(
         "INSERT INTO fortunetigerplayerjson (id) VALUES (?)",
         [id],
      )

      return res[0]
   },
}
