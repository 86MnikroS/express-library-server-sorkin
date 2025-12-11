import mysql from "mysql2/promise";
import confJson from "../../config/lib-config.json" with { type: 'json' };
export const DB = process.env.DB;
export const ACCOUNT_DB = process.env.ACCOUNT_DB;
export const config = Object.assign({}, confJson);
export const createSqlPool = () => {
    return mysql.createPool({
        host: process.env.SQL_HOST,
        port: +process.env.SQL_PORT,
        user: process.env.SQL_USER || "root",
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DB_NAME
    });
};
