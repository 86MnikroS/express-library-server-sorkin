import { BookService } from "./BookService.ts";
import { Book, BookStatus, BookModel, toBook } from "../model/book.ts";
import { HttpError } from "../errorHandler/HttpError.ts";

export class BookServiceImplMongo implements BookService {

    async addBook(book: Book): Promise<void> {
        await BookModel.create({
            title: book.title,
            author: book.author,
            genre: book.genre,
            year: book.year,
            status: book.status ?? BookStatus.IN_STOCK,
            pickList: book.pickList ?? [],
        });
    }

    async getAllBooks(): Promise<Book[]> {
        const docs = await BookModel.find();
        return docs.map(toBook);
    }

    async getBookByAuthor(author: string): Promise<Book[]> {
        const docs = await BookModel.find({ author });
        return docs.map(toBook);
    }

    async removeBook(id: string): Promise<Book> {
        const deleted = await BookModel.findByIdAndDelete(id);
        if (!deleted) {
            throw new HttpError(404, `Book with id ${id} not found`);
        }
        return toBook(deleted);
    }

    async pickBook(id: string, reader: string, readerId: number): Promise<void> {
        const doc = await BookModel.findById(id);
        if (!doc) {
            throw new HttpError(404, `Book with id ${id} not found`);
        }

        if (doc.status === BookStatus.ON_HAND) {
            throw new HttpError(409, "Book is already on hand");
        }

        doc.pickList.push({
            readerId: readerId.toString(),
            readerName: reader,
            pickDate: new Date().toISOString(),
            returnDate: null,
        });

        doc.status = BookStatus.ON_HAND;
        await doc.save();
    }

    async returnBook(id: string): Promise<void> {
        const doc = await BookModel.findById(id);
        if (!doc) {
            throw new HttpError(404, `Book with id ${id} not found`);
        }

        if (doc.status !== BookStatus.ON_HAND) {
            throw new HttpError(409, "Book is not on hand");
        }

        const lastRecord = doc.pickList[doc.pickList.length - 1];
        if (lastRecord && !lastRecord.returnDate) {
            lastRecord.returnDate = new Date().toISOString();
        }

        doc.status = BookStatus.IN_STOCK;
        await doc.save();
    }
}

