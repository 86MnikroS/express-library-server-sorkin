import {AccountService} from "./AccountService.ts";
import {Promise} from "mongoose";
import {Reader, UpdateReaderDTO} from "../model/reader.ts";

class AccountServiceImplMongo implements AccountService{
    changePassword(id: number, newPassword: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    createAccount(reader: Reader): Promise<void> {
        return Promise.resolve(undefined);
    }

    editAccount(id: number, newReaderData: UpdateReaderDTO): Promise<Reader> {
        return Promise.resolve(undefined);
    }

    getAccount(id: number): Promise<Reader> {
        throw ""
    }

    removeAccount(id: number): Promise<Reader> {
        throw ""
    }

}

export const accountServiceMongo = new AccountServiceImplMongo();