import { launchServer } from "./server.js";
import mongoose from "mongoose";
import { createSqlPool } from "./configurations/appConfig.js";
import dotenv from "dotenv";

dotenv.config();

// SQL
export const pool = createSqlPool();
console.log("SQL connected");

// Mongo
mongoose.connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log("Mongo db connected");
        launchServer();
    })
    .catch(err => {
        console.log("Mongo connection failed", err);
    });