import {NextFunction, Request, Response} from "express";
import {Reader, ReaderDto, UpdateReaderDto} from "../model/reader.js";
import {accountServiceMongo} from "../service/AccountServiceImplMongo.js";
import {HttpError} from "../errorHandler/HttpError.js";
import {convertReaderDtoToReader, getRole} from "../utils/tools.js";
import {AuthRequest, Roles} from "../utils/libTypes.js";

class AccountController {
    service = accountServiceMongo;

    createAccount = async (req: Request, res: Response) => {
        const body = req.body as ReaderDto;
        const reader: Reader = convertReaderDtoToReader(body);
        await this.service.createAccount(reader);
        res.status(201).send();
    };
    getAccountById =  async (req: AuthRequest, res: Response) => {
        const id = +req.query.id!;
        if (!id) throw new HttpError(400, "No params");

        const loggedId = req.userId;
        const roles = req.roles || [];

        const isAdmin = roles.includes(Roles.ADMIN);
        const isLibrarian = roles.includes(Roles.LIBRARIAN);
        const isOwner = loggedId === id;
        const isReader = roles.includes(Roles.READER);

        if (!(isAdmin || isLibrarian || (isReader && isOwner))) {
            throw new HttpError(403, "You cannot access this account");
        }

        const account = await this.service.getAccount(id);
        res.json(account)
    };
    removeAccount  = async (req: Request, res: Response) => {
        const id = +req.query.id!;
        const account = await this.service.removeAccount(id);
        res.json(account)
    };
    async changePassword(req: AuthRequest, res:Response, next:NextFunction) {
        try {
            const loggedId = req.userId;
            const { id, oldPassword, newPassword } = req.body;

            if (loggedId !== id) {
                throw new HttpError(403, "Only the account owner can change password");
            }

            const account = await this.service.getAccount(id);

            if (account.passHash !== oldPassword) {
                throw new HttpError(403, "Old password is incorrect");
            }

            const updated = await this.service.changePassword(id, newPassword);
            res.json({ message: "Password updated", updated });
            return;
        } catch (e) {
            next(e);
        }
    }
    editAccount  = async (req: AuthRequest, res: Response) => {
        const id = +req.query.id!;

        const loggedId = req.userId;
        const roles = req.roles || [];
        const isAdmin = roles.includes(Roles.ADMIN);
        const isOwner = loggedId === id;

        if (!isOwner && !isAdmin) {
            throw new HttpError(403, "Only owner or admin can edit this account");
        }

        const newReaderData = req.body as UpdateReaderDto;
        const updated = await this.service.editAccount(id, newReaderData);
        res.json(updated);
    };
    addRole = async (req: Request, res: Response) => {
        const newRole = getRole(req.query.role as string);
        const readerId = +req.query.id!;//Todo
        const readerWithNewRole = await this.service.addRole(readerId, newRole);
        res.json(readerWithNewRole);
    };
    login =  async (req: Request, res: Response) => {
        const {id, password} = req.body;
        const token = await this.service.login(id, password);
        res.send(token)
    };


}

export const accountController = new AccountController();