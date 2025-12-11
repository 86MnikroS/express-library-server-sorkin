import mysql, {Pool} from "mysql2/promise"
import dotenv from "dotenv";
import {Roles} from "../utils/libTypes.js";
import confJson from "../../config/lib-config.json" with {type:'json'}

export const DB = process.env.DB!;
export const ACCOUNT_DB = process.env.ACCOUNT_DB!;

export type AppConfig = {
    port: number,
    skipRoutesArr: string[],
    pathRoles: Record<string, string[]>,
    timeWindowMs: number,
    requestLimit: number
}

export const config:AppConfig = {...confJson}

 export const createSqlPool = () => {
    return mysql.createPool({
         host:process.env.SQL_HOST,
         port: +process.env.SQL_PORT!,
         user:process.env.SQL_USER || "root",
         password:process.env.SQL_PASSWORD,
         database:process.env.SQL_DB_NAME
     })
 }
