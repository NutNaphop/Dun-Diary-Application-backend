import { Request, Response, NextFunction } from 'express';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Can not find a route: ${req.originalUrl}`);
    res.status(404);
    next(err);
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);

    console.error(`🔥 [${new Date().toISOString()}] Error: ${err.message}`);

    res.status(statusCode);
    res.json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
};