import moment from "moment-timezone"
import { ResultSetHeader } from "mysql2"
import { hash } from "bcrypt"
import promisePool from "../database"

class Register {
  username!: string
  password!: string
  cpf!: string
  email!: string
  telefone!: string
  indicadode?: string
  ref_id!: string
  ip!: string

  constructor(
    username: string,
    password: string,
    cpf: string,
    email: string,
    telefone: string,
    ref_id: string,
    ip: string,
    indicadode?: string,
  ) {
    this.username = username
    this.password = password
    this.cpf = cpf
    this.email = email
    this.telefone = telefone
    this.ref_id = ref_id
    this.ip = ip
    this.indicadode = indicadode
  }

  async register() {
    const passhash = await hash(this.password, 10)
    const dataregistro = moment()
      .tz("America/Sao_Paulo")
      .format("YYYY-MM-DD HH:mm:ss")

    const res = await promisePool.query<ResultSetHeader>(
      "INSERT INTO users SET username = ?,email = ?,password = ?,number_phone = ?,cpf = ?,ref_id = ?,ip = ?,data_registro = ?,indicadode = ?",
      [
        this.username,
        this.email,
        passhash,
        this.telefone,
        this.cpf,
        this.ref_id,
        this.ip,
        dataregistro,
        this.indicadode,
      ],
    )
    return res[0]
  }
}

export default Register
