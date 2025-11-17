/////(req,res,next) =>{
//=========================some code=====================
// next();
//}

import e, {NextFunction} from "express";
import Joi from "joi";
import {HttpError} from "../errorHandler/HttpError.ts";

export const bodyValidator = (schema:Joi.ObjectSchema) =>{
    return (req:e.Request, res:e.Response, next:NextFunction) => {
        const {error} = schema.validate(req.body);
        if(error) throw new HttpError(400,error.message);
        next();
    }
}