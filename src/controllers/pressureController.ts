import { Request, Response, NextFunction } from 'express';
import * as aiService from '../services/aiService';
import { pressureSchema, PressureData } from '../models/pressureModel';
import { z } from 'zod';

export const analyzePressure = async (req: Request<{}, {}, PressureData>, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        const analysisResult = await aiService.analyzeBloodPressure(data);

        res.status(200).json({
            success: true,
            data: {
                analysis: analysisResult,
                timestamp: new Date()
            }
        });

    } catch (error) {
        next(error);
    }
};