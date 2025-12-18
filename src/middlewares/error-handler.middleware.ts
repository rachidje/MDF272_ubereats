import { NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware = (error: any, _req: Request, res: Response, _next: NextFunction) => {
    const formattedError = {
        message: error.message || "An error occured",
        code: error.statusCode || 500
    }

    res.jsonError(formattedError.message, formattedError.code);
}