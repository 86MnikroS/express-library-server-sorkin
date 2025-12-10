import { HttpError } from "../errorHandler/HttpError.js";
export const paramsValidator = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params);
        if (error)
            throw new HttpError(400, error.message);
        next();
    };
};
