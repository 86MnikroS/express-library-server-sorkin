import {Book, BookDto, BookGenres, BookStatus} from "../model/book.ts";
import {HttpError} from "../errorHandler/HttpError.ts";
import {v4 as uuidv4} from 'uuid';
import {Reader, ReaderDto} from "../model/reader.ts";
import bcrypt from "bcryptjs";

export function getGenre(genre: string) {
    const gen = Object.values(BookGenres).find(v => v === genre);
    if (!gen) throw new HttpError(400, "Wrong genre")
    return gen;
}

export const convertBookDtoToBook = (dto: BookDto): Book => {
    return {
        author: dto.author,
        genre: getGenre(dto.genre),
        id: uuidv4(),
        pickList: [],
        status: BookStatus.IN_STOCK,
        title: dto.title,
        year: dto.year
    }
}

export const convertReaderDtoToReader = (readerDto: ReaderDto) => {
    const salt = bcrypt.genSaltSync(10);

    const reader = {
        username: readerDto.username,
        email: readerDto.email,
        passHash: bcrypt.hashSync(readerDto.password, salt),
        birthDate: readerDto.birthDate
    };
    return reader;
}