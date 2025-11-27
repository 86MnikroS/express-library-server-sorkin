import express from "express";
import morgan from "morgan";
import fs from "node:fs";
import { errorHandler } from "./errorHandler/errorHandler.js";
import { bookRouter } from "./routers/bookRouter.js";
import { accountRouter } from "./routers/accountRouter.js";

export const launchServer = () => {
    const app = express();

    app.listen(process.env.PORT, () => {
        console.log(`Server runs at http://localhost:${process.env.PORT}`);
    });

    const logStream = fs.createWriteStream('app.log', { flags:'a' });

    app.use(express.json());
    app.use(morgan('combined'));
    app.use(morgan('common', { stream: logStream }));

    app.use('/api/books', bookRouter);
    app.use('/account', accountRouter);

    app.use((req, res) => {
        res.status(404).send("Page not found");
    });

    app.use(errorHandler);
};