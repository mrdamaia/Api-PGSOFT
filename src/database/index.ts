import mysql, { PoolOptions } from 'mysql2';
import logger from '../logger'

import 'dotenv/config'

const access: PoolOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

const pool = mysql.createPool(access);
const promisePool = pool.promise();

pool.getConnection((err, con) => {
    try {
        if (con) {
            con.release();
            logger.info(`Conexão Estabelicida com sucesso`);
        }
    }
    catch (err) {
        logger.error(`MySQL error. ${err}`);
    }
});
export default promisePool;