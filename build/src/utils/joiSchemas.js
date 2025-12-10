import Joi from "joi";
//Book schema
export const bookJoiSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    year: Joi.number().min(1900).max(new Date().getFullYear()).required(),
    quantity: Joi.number().positive().max(100),
});
//PickList Schema
export const readerJoiSchema = Joi.object({
    readerName: Joi.string().required(),
    readerId: Joi.number().positive().min(100000000).required(),
});
//Account / Reader Schemas
/* 1. Create Reader */
export const createReaderJoiSchema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
    birthDate: Joi.string().required(),
});
/* 2. Update Reader */
export const updateReaderJoiSchema = Joi.object({
    username: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    birthDate: Joi.string(),
});
/* 3. Change Password */
export const changePasswordJoiSchema = Joi.object({
    newPassword: Joi.string().min(6).max(50).required(),
});
/* 4. UUID ID Validation */
export const idJoiSchema = Joi.object({
    id: Joi.string().required(),
});
