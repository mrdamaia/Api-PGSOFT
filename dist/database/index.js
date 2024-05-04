"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const logger_1 = __importDefault(require("../logger"));
require("dotenv/config");
const access = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};
const pool = mysql2_1.default.createPool(access);
const promisePool = pool.promise();
pool.getConnection((err, con) => {
    try {
        if (con) {
            con.release();
            logger_1.default.info(`Conexão Estabelicida com sucesso`);
        }
    }
    catch (err) {
        logger_1.default.error(`MySQL error. ${err}`);
    }
});
exports.default = promisePool;
