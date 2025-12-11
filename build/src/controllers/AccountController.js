var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { accountServiceMongo } from "../service/AccountServiceImplMongo.js";
import { HttpError } from "../errorHandler/HttpError.js";
import { convertReaderDtoToReader, getRole } from "../utils/tools.js";
import { Roles } from "../utils/libTypes.js";
class AccountController {
    constructor() {
        this.service = accountServiceMongo;
        this.createAccount = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const reader = convertReaderDtoToReader(body);
            yield this.service.createAccount(reader);
            res.status(201).send();
        });
        this.getAccountById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.query.id;
            if (!id)
                throw new HttpError(400, "No params");
            const loggedId = req.userId;
            const roles = req.roles || [];
            const isAdmin = roles.includes(Roles.ADMIN);
            const isLibrarian = roles.includes(Roles.LIBRARIAN);
            const isOwner = loggedId === id;
            const isReader = roles.includes(Roles.READER);
            if (!(isAdmin || isLibrarian || (isReader && isOwner))) {
                throw new HttpError(403, "You cannot access this account");
            }
            const account = yield this.service.getAccount(id);
            res.json(account);
        });
        this.removeAccount = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.query.id;
            const account = yield this.service.removeAccount(id);
            res.json(account);
        });
        this.editAccount = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.query.id;
            const loggedId = req.userId;
            const roles = req.roles || [];
            const isAdmin = roles.includes(Roles.ADMIN);
            const isOwner = loggedId === id;
            if (!isOwner && !isAdmin) {
                throw new HttpError(403, "Only owner or admin can edit this account");
            }
            const newReaderData = req.body;
            const updated = yield this.service.editAccount(id, newReaderData);
            res.json(updated);
        });
        this.addRole = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newRole = getRole(req.query.role);
            const readerId = +req.query.id; //Todo
            const readerWithNewRole = yield this.service.addRole(readerId, newRole);
            res.json(readerWithNewRole);
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id, password } = req.body;
            const token = yield this.service.login(id, password);
            res.send(token);
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loggedId = req.userId;
                const { id, oldPassword, newPassword } = req.body;
                if (loggedId !== id) {
                    throw new HttpError(403, "Only the account owner can change password");
                }
                const account = yield this.service.getAccount(id);
                if (account.passHash !== oldPassword) {
                    throw new HttpError(403, "Old password is incorrect");
                }
                const updated = yield this.service.changePassword(id, newPassword);
                res.json({ message: "Password updated", updated });
                return;
            }
            catch (e) {
                next(e);
            }
        });
    }
}
export const accountController = new AccountController();
