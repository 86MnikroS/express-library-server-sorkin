import {BookService} from "./BookService.ts";
import {Book} from "../model/book.ts";
import { pool } from "../app.js";


export class BookServiceImplSQL implements BookService {
    async addBook(book: Book): Promise<void> {
        await pool.query(
            `INSERT INTO books (id, title, author, genre, status, year)
         VALUES (?, ?, ?, ?, ?, ?)`,
            [book.id, book.title, book.author, book.genre, book.status, book.year]
        );
    }

    async getAllBooks(): Promise<Book[]> {
        const [rows] = await pool.query(
            `SELECT id, title, author, genre, status, year FROM books`
        ) as any;
        return rows as Book[];
    }

    async getBookByAuthor(author: string): Promise<Book[]> {
        const [rows] = await pool.query(
            `SELECT id, title, author, genre, status, year 
             FROM books 
             WHERE author = ?`,
            [author]
        ) as any;
        return rows as Book[];
    }

    async pickBook(id: string, readerName: string, readerId: number): Promise<void> {
        // ensure reader exists
        await pool.query(
            `INSERT IGNORE INTO readers (readerId, readerName)
             VALUES (?, ?)`,
            [readerId, readerName]
        );

        // update book status
        await pool.query(
            `UPDATE books 
             SET status = 'picked' 
             WHERE id = ?`,
            [id]
        );

        // create pick record
        await pool.query(
            `INSERT INTO books_readers (book_id, readerId)
             VALUES (?, ?)`,
            [id, readerId]
        );
    }

    async removeBook(id: string): Promise<Book> {
        const [rows] = await pool.query(
            `SELECT id, title, author, genre, status, year 
             FROM books 
             WHERE id = ?`,
            [id]
        ) as any;

        if (!rows.length) {
            throw new Error(`Book with id ${id} not found`);
        }

        const book = rows[0] as Book;

        await pool.query(
            `DELETE FROM books WHERE id = ?`,
            [id]
        );

        return book;
    }

    async returnBook(id: string): Promise<void> {
        // close the active borrow record
        await pool.query(
            `UPDATE books_readers 
             SET returned_at = NOW() 
             WHERE book_id = ? 
               AND returned_at IS NULL`,
            [id]
        );

        // update book status back to in_stock
        await pool.query(
            `UPDATE books 
             SET status = 'in_stock' 
             WHERE id = ?`,
            [id]
        );
    }


}

export const bookServiceSQL = new BookServiceImplSQL();