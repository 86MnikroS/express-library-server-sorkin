import {BookService} from "../service/BookService.ts";
import {bookServiceEmbedded} from "../service/BookServiceImplEmbedded.ts";
import {Book, BookDto} from "../model/book.ts";
import {NextFunction, Request, Response} from "express";
import {convertBookDtoToBook} from "../utils/tools.ts";

export class BookController {
    private service: BookService = bookServiceEmbedded;

    async addBook(req: Request, res: Response) {
        const dto = req.body as BookDto;
        const book: Book = convertBookDtoToBook(dto);
        const result = await this.service.addBook(book);
        res.status(201).json(result);
    }

    getAllBooks = async (req: Request, res: Response) => {
        const result = await this.service.getAllBooks();
        res.json(result);
    }
}

export const bookController = new BookController();