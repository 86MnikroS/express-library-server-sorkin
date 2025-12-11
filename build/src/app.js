import { launchServer } from "./server.js";
import * as mongoose from "mongoose";
import { createSqlPool } from "./configurations/appConfig.js";
import dotenv from "dotenv";
dotenv.config();
export const pool = createSqlPool();
console.log("SQL connected");
mongoose.connect(process.env.DB).then(() => {
    console.log("Mongo db connected");
    launchServer();
}).catch(err => {
    console.log("Mongo connection failed");
});
