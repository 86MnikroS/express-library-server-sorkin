import {AccountService} from "./AccountService.ts";
import {Reader, UpdateReaderDTO} from "../model/reader.ts";
import { readerMongooseModel } from "../databases/mongooseSchemas.ts";

class AccountServiceImplMongo implements AccountService{
    changePassword(id: string, newPassword: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    createAccount(reader: Reader): Promise<void> {
        return readerMongooseModel.create(reader).then(() => {});
    }

    editAccount(id: string, newReaderData: UpdateReaderDTO): Promise<Reader> {
        return Promise.resolve(null as any);
    }

    getAccount(id: string): Promise<Reader | null> {
        return readerMongooseModel.findById(id).exec();
    }

    removeAccount(id: string): Promise<Reader> {
        return Promise.resolve(null as any);
    }

}

export const accountServiceMongo = new AccountServiceImplMongo();