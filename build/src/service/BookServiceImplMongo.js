var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BookStatus, BookModel, toBook } from "../model/book.js";
import { HttpError } from "../errorHandler/HttpError.js";
export class BookServiceImplMongo {
    addBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            yield BookModel.create({
                title: book.title,
                author: book.author,
                genre: book.genre,
                year: book.year,
                status: (_a = book.status) !== null && _a !== void 0 ? _a : BookStatus.IN_STOCK,
                pickList: (_b = book.pickList) !== null && _b !== void 0 ? _b : [],
            });
        });
    }
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const docs = yield BookModel.find();
            return docs.map(toBook);
        });
    }
    getBookByAuthor(author) {
        return __awaiter(this, void 0, void 0, function* () {
            const docs = yield BookModel.find({ author });
            return docs.map(toBook);
        });
    }
    removeBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield BookModel.findByIdAndDelete(id);
            if (!deleted) {
                throw new HttpError(404, `Book with id ${id} not found`);
            }
            return toBook(deleted);
        });
    }
    pickBook(id, reader, readerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield BookModel.findById(id);
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
            yield doc.save();
        });
    }
    returnBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield BookModel.findById(id);
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
            yield doc.save();
        });
    }
}
