import mysql from "mysql2/promise"
import dotenv from "dotenv";
dotenv.config();

export const DB = process.env.DB!;
export const ACCOUNT_DB = process.env.ACCOUNT_DB!;

import {Roles} from "../utils/libTypes.js";

export  const PORT = 3050;

 export const createSqlPool = () => {
    return mysql.createPool({
         host:process.env.SQL_HOST,
         port: +process.env.SQL_PORT!,
         user:process.env.SQL_USER || "root",
         password:process.env.SQL_PASSWORD,
         database:process.env.SQL_DB_NAME
     })
 }

 export const skipRoutesArr = ["POST/account", "POST/account/login"];

export const pathRoles = {
    // ==== Accounts ====
    "GET/account/byId": [Roles.ADMIN, Roles.LIBRARIAN, Roles.READER],
    "PATCH/account/password": [],
    "PATCH/account/update": [Roles.ADMIN, Roles.READER],
    "DELETE/account": [Roles.SUPERVISOR],
    "PATCH/account/roles": [Roles.SUPERVISOR],

    // ==== Books ====
    // BooksLIst
    "GET/api/books": [
        Roles.READER,
        Roles.LIBRARIAN,
        Roles.ADMIN,
        Roles.SUPERVISOR
    ],

    // Add Book
    "POST/api/books": [
        Roles.LIBRARIAN,
        Roles.ADMIN,
        Roles.SUPERVISOR
    ],

    // Delete books
    "DELETE/api/books": [
        Roles.ADMIN,
        Roles.SUPERVISOR
    ],

    // Pick book
    "PATCH/api/books/pick": [
        Roles.READER,
        Roles.LIBRARIAN,
        Roles.ADMIN,
        Roles.SUPERVISOR
    ],

    // Return book
    "PATCH/api/books/return": [
        Roles.READER,
        Roles.LIBRARIAN,
        Roles.ADMIN,
        Roles.SUPERVISOR
    ],

    // Search by author
    "GET/api/books/author": [
        Roles.READER,
        Roles.LIBRARIAN,
        Roles.ADMIN,
        Roles.SUPERVISOR
    ]
}
