import express from "express";
import {accountController} from "../controllers/AccountController.ts";
import {bodyValidator} from "../middleware/bodyValidator.ts";
import {paramsValidator} from "../middleware/paramsValidator.ts";
import {
    createReaderJoiSchema,
    changePasswordJoiSchema,
    updateReaderJoiSchema,
    idJoiSchema
} from "../utils/joiSchemas.ts";

export const accountRouter = express.Router();

const controller = accountController;

accountRouter.post('/', bodyValidator(createReaderJoiSchema), controller.createReader);

accountRouter.get('/:id', paramsValidator(idJoiSchema), controller.getAccountById);

accountRouter.delete('/:id', paramsValidator(idJoiSchema), controller.removeAccount);

accountRouter.patch('/password/:id', paramsValidator(idJoiSchema), bodyValidator(changePasswordJoiSchema), controller.changePassword);

accountRouter.patch('/update/:id', paramsValidator(idJoiSchema), bodyValidator(updateReaderJoiSchema), controller.editAccount);