export type ReaderDto = {
    username: string;
    email: string;
    password: string;
    birthDate: string;
};

export type UpdateReaderDTO = {
    username?: string;
    email?: string;
    birthDate?: string;
};

export type Reader = {
    _id: string;
    username: string;
    email: string;
    passHash: string;
    birthDate: string;
    createdAt?: Date;
};