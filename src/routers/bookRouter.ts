import {Router} from "express";
import {bookController} from "../controllers/BookController.ts";

export const bookRouter = Router();

bookRouter.get('/', bookController.getAllBooks);
bookRouter.post('/', bookController.addBook); // (req, res) => {}bookController.addBook