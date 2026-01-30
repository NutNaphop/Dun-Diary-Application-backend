import { Request, Response, NextFunction } from 'express';
import * as aiService from '../services/aiService';
import { PressureInput } from '../models/pressureModel';

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