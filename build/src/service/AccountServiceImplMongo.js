import { readerMongooseModel } from "../databases/mongooseSchemas.js";
class AccountServiceImplMongo {
    changePassword(id, newPassword) {
        return Promise.resolve(undefined);
    }
    createAccount(reader) {
        return readerMongooseModel.create(reader).then(() => { });
    }
    editAccount(id, newReaderData) {
        return Promise.resolve(null);
    }
    getAccount(id) {
        return readerMongooseModel.findById(id).exec();
    }
    removeAccount(id) {
        return Promise.resolve(null);
    }
}
export const accountServiceMongo = new AccountServiceImplMongo();
