import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { HttpError } from "../errorHandler/HttpError.ts";

export const paramsValidator = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.params);
        if (error) throw new HttpError(400, error.message);
        next();
    };
};