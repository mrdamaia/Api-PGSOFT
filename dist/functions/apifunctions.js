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
const database_1 = __importDefault(require("../database"));
exports.default = {
    getagentbyagentToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query(`SELECT * FROM agents WHERE agentToken= ?`, [token]);
            return res[0];
        });
    },
    getagentbysecretkey(secretkey) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query(`SELECT * FROM agents WHERE secretKey= ?`, [secretkey]);
            return res[0];
        });
    },
    getuserbyagent(usercode, agentid) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query(`SELECT * FROM users WHERE username= ? and agentid = ?`, [usercode, agentid]);
            return res[0];
        });
    },
    setbalanceuserbyid(id, balance) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query("UPDATE users SET saldo = ? WHERE id=?", [balance, id]);
            return res[0];
        });
    },
    createuser(user_code, tokenuser, atkuser, balance, agentid) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query("INSERT INTO users (username,token,atk,saldo,agentid) VALUES(?,?,?,?,?)", [user_code, tokenuser, atkuser, balance, agentid]);
            return res[0];
        });
    },
    attagent(id, probganho, probbonus, probganhortp, probganhoinfluencer, probbonusinfluencer, probganhoaposta, probganhosaldo) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.default.query("UPDATE agents SET probganho = ?,probbonus = ?,probganhortp = ?,probganhoinfluencer = ?,probbonusinfluencer = ?,probganhoaposta = ?,probganhosaldo = ? WHERE id=?", [probganho, probbonus, probganhortp, probganhoinfluencer, probbonusinfluencer, probganhoaposta, probganhosaldo, id]);
            return res[0];
        });
    },
};
