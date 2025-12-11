import { HttpError } from "../errorHandler/HttpError.js";
export const bodyValidator = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error)
            throw new HttpError(400, error.message);
        next();
    };
};
