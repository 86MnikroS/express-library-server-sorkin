import express from "express";
import dotenv from "dotenv";
import { createSqlPool } from "./configurations/appConfig.js";
import { bookRouter } from "./routers/bookRouter.ts";
import { errorHandler } from "./errorHandler/errorHandler.ts";
import {accountRouter} from "./routers/accountRouter.ts";

dotenv.config();

export const app = express();
export const pool = createSqlPool(); // <-- создаём пул сразу

// Middleware
app.use(express.json());

// Routers
app.use("/api/books", bookRouter);
app.use('account', accountRouter);

// 404
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Error handler
app.use(errorHandler);

// ---- SERVER STARTUP ----
const start = () => {
    console.log("SQL Connected");

    app.listen(process.env.PORT, () => {
        console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
};

start();