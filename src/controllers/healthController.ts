import { Request, Response, NextFunction } from 'express';

export const sendHealth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            status: 'OK',
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
};