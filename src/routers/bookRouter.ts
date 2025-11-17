import { Router } from "express";
import { bookController } from "../controllers/BookController.ts";
import {bodyValidator} from "../middleware/bodyValidator.ts";
import {bookJoiSchema, readerJoiSchema} from "../utils/joiSchemas.ts";

export const bookRouter = Router();

// GET /books
bookRouter.get("/", bookController.getAllBooks);

// GET /books/author/:author
bookRouter.get("/author/:author", bookController.getBookByAuthor);

// POST /books
bookRouter.post("/", bodyValidator(bookJoiSchema), bookController.addBook);

// DELETE /books/:id
bookRouter.delete("/:id", bookController.removeBook);

// POST /books/:id/pick
bookRouter.post("/:id/pick", bodyValidator(readerJoiSchema), bookController.pickBook);

// POST /books/:id/return
bookRouter.post("/:id/return", bookController.returnBook);