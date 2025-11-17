import {Book, BookDto, BookGenres, BookStatus} from "../model/book.ts";
import {HttpError} from "../errorHandler/HttpError.ts";
import {v4 as uuidv4} from 'uuid';

export function getGenre(genre: string) {
    const gen = Object.values(BookGenres).find(v=> v===genre);
    if(!gen) throw new HttpError(400, "Wrong genre")
    return gen;
}

export const convertBookDtoToBook = (dto:BookDto):Book => {
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