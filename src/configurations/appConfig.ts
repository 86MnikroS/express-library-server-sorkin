import mongoose from "mongoose";
import mysql from "mysql2/promise";

export const PORT = +process.env.PORT!;

export const db = 'mongodb+srv://sorkinmihail_db_user:2wQJ9mbrwTndXxnw@cluster0.0k2kaeu.mongodb.net/?appName=Cluster0';

export const createSqlPool = () => {
    return mysql.createPool({
        host: process.env.SQL_HOST,
        port: +process.env.SQL_PORT!,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DB_NAME,
    });
};

export async function connectToMongo(uri:string) {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB");
        process.exit(1);
    }
}