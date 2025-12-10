var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from "../app.js";
export class BookServiceImplSQL {
    addBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`INSERT INTO books (id, title, author, genre, status, year)
         VALUES (?, ?, ?, ?, ?, ?)`, [book.id, book.title, book.author, book.genre, book.status, book.year]);
        });
    }
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT id, title, author, genre, status, year FROM books`);
            return rows;
        });
    }
    getBookByAuthor(author) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT id, title, author, genre, status, year 
             FROM books 
             WHERE author = ?`, [author]);
            return rows;
        });
    }
    pickBook(id, readerName, readerId) {
        return __awaiter(this, void 0, void 0, function* () {
            // ensure reader exists
            yield pool.query(`INSERT IGNORE INTO readers (readerId, readerName)
             VALUES (?, ?)`, [readerId, readerName]);
            // update book status
            yield pool.query(`UPDATE books 
             SET status = 'picked' 
             WHERE id = ?`, [id]);
            // create pick record
            yield pool.query(`INSERT INTO books_readers (book_id, readerId)
             VALUES (?, ?)`, [id, readerId]);
        });
    }
    removeBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT id, title, author, genre, status, year 
             FROM books 
             WHERE id = ?`, [id]);
            if (!rows.length) {
                throw new Error(`Book with id ${id} not found`);
            }
            const book = rows[0];
            yield pool.query(`DELETE FROM books WHERE id = ?`, [id]);
            return book;
        });
    }
    returnBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // close the active borrow record
            yield pool.query(`UPDATE books_readers 
             SET returned_at = NOW() 
             WHERE book_id = ? 
               AND returned_at IS NULL`, [id]);
            // update book status back to in_stock
            yield pool.query(`UPDATE books 
             SET status = 'in_stock' 
             WHERE id = ?`, [id]);
        });
    }
}
export const bookServiceSQL = new BookServiceImplSQL();
