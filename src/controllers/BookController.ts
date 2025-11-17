import {BookService} from "../service/BookService.ts";
import {bookServiceEmbedded} from "../service/BookServiceImplEmbedded.ts";
import {Book, BookDto} from "../model/book.ts";
import {NextFunction, Request, Response} from "express";
import {convertBookDtoToBook} from "../utils/tools.ts";
import {BookServiceImplMongo} from "../service/BookServiceImplMongo.ts";
import {BookCollectionImplMongoNew} from "../service/bookServiceImplMongoNew.ts";

export class BookController {
    //private service: BookService = new BookServiceImplMongo();
    private service: BookService = new BookCollectionImplMongoNew();

    addBook = async (req: Request, res: Response) => {
        const dto = req.body as BookDto;
        const book: Book = convertBookDtoToBook(dto);
        const result = await this.service.addBook(book);
        res.status(201).json(result);
    }

    getAllBooks = async (req: Request, res: Response) => {
        const result = await this.service.getAllBooks();
        res.json(result);
    }

    removeBook = async (req: Request, res: Response) => {
        const id = req.params.id;
        const result = await this.service.removeBook(id);
        res.json(result);
    }

    pickBook = async (req: Request, res: Response) => {
        const id = req.params.id;
        const { reader, readerId } = req.body;
        await this.service.pickBook(id, reader, readerId);
        res.status(200).json({ message: "Book picked successfully" });
    }

    returnBook = async (req: Request, res: Response) => {
        const id = req.params.id;
        await this.service.returnBook(id);
        res.status(200).json({ message: "Book returned successfully" });
    }

    getBookByAuthor = async (req: Request, res: Response) => {
        const author = req.params.author;
        const result = await this.service.getBookByAuthor(author);
        res.json(result);
    }
}

export const bookController = new BookController();