import {Reader, UpdateReaderDTO} from "../model/reader.ts";

export interface AccountService {
    createAccount: (reader: Reader) => Promise<void>;
    getAccount: (id: string) => Promise<Reader | null>;
    removeAccount: (id: string) => Promise<Reader | null>;
    changePassword: (id: string, newPassword: string) => Promise<void>;
    editAccount:(id: string, newReaderData: UpdateReaderDTO) => Promise<Reader | null>;
}