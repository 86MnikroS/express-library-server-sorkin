import mongoose, {Schema, Document} from 'mongoose';

export type BookDto = {
    title: string,
    author: string,
    genre: string,
    year: number,
    quantity?: number
}

export type Book = {
    id: string,
    title: string,
    author: string,
    genre: BookGenres,
    year: number,
    status: BookStatus,
    pickList: PickRecord[];
}

export enum BookGenres {
    CLASSIC = 'classic',
    DETECTIVE = 'detective',
    ROMANTIC = 'role',
    DYSTOPIA = 'dystopia',
    FANTASY = 'fantasy',
    KIDS = 'kids'
}

export enum BookStatus {
    IN_STOCK = 'in_stock',
    ON_HAND = 'on_hand',
    REMOVED = 'removed'
}

export type PickRecord = {
    readerId: string,
    readerName: string,
    pickDate: string,
    returnDate: string | null
}

export interface BookDocument extends Document {
    _id: mongoose.Types.ObjectId;
    title: string,
    author: string,
    genre: BookGenres,
    year: number,
    status: BookStatus,
    pickList: PickRecord[],
    quantity?: number;
}

const PickRecordSchema = new Schema<PickRecord>(
    {
        readerId: {type: String, required: true},
        readerName: {type: String, required: true},
        pickDate: {type: String, required: true},
        returnDate: {type: String, required: true},
    },
    {_id: false}
);

const BookSchema = new Schema<BookDocument>(
    {
        title: {type: String, required: true},
        author: {type: String, required: true},
        genre: {
            type: String,
            enum: Object.values(BookGenres),
            required: true,
        },
        year: {type: Number, required: true},
        status: {
            type: String,
            enum: Object.values(BookStatus),
            default: BookStatus.IN_STOCK,
        },
        pickList: {
            type: [PickRecordSchema],
            default: [],
        },
        quantity: {type: Number, default: 1},
    },
    {timestamps: true},
);

export const BookModel = mongoose.model<BookDocument>('Book', BookSchema);

export function toBook(doc: BookDocument):Book {
    return {
        id: doc._id.toString(),
        title: doc.title,
        author: doc.author,
        genre: doc.genre,
        year: doc.year,
        status: doc.status,
        pickList: doc.pickList,
    };
}