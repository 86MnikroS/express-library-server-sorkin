import {AuthRequest, Roles} from "../utils/libTypes.js";
import {Response, NextFunction} from "express";
import {HttpError} from "../errorHandler/HttpError.js";
import {config} from "../configurations/appConfig.js";

export const authorize = (pathRoles: Record<string, Roles[]>) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const roles = req.roles;
        const route = req.method + req.path;
        if (!pathRoles[route] || (roles && roles.some(r => pathRoles[route].includes(r))))
            next();
        else throw new HttpError(403, "");
    }
}

export const requestLimitControl = (storage: Map<number, number[]>) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const userRoles = req.roles;
        const userId = Number(req.userId);
        const now = Date.now();
        const isReader =
            userRoles?.length === 1 && userRoles.includes(Roles.READER);
        if (!isReader) {
            return next();
        }
        const timestamps = storage.get(userId);
        const isNewWindow =
            !timestamps || now - timestamps[0] > config.timeWindowMs;
        if (isNewWindow) {
            storage.set(userId, [now]);
            return next();
        }
        if (timestamps.length >= config.requestLimit) {
            throw new HttpError(403, "Too many requests");
        }
        timestamps.push(now);
        next();
    };
};