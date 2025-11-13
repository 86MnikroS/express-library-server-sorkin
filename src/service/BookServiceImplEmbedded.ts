import {BookService} from "./BookService.ts";
import {Book} from "../model/book.ts";
import {HttpError} from "../errorHandler/HttpError.ts";

class BookServiceImplEmbedded implements BookService {
    private books: Book[] = [];

    addBook(book: Book): Promise<void> {
        if (this.books.find(item => item.id === book.id))
            throw new HttpError(409, `Book with id: ${book.id} already exists`);
        this.books.push(book);
        return Promise.resolve();
    }

    getAllBooks(): Promise<Book[]> {
        return Promise.resolve([...this.books]);
    }

    getBookByAuthor(author: string): Promise<Book[]> {
        return Promise.resolve([]);
    }

    pickBook(id: string, reader: string, readerId: number): Promise<void> {
        return Promise.resolve(undefined);
    }

    removeBook(id: string): Promise<Book> {
        throw ""
    }

    returnBook(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }
}
export const bookServiceEmbedded = new BookServiceImplEmbedded();