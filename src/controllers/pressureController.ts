import { Request, Response, NextFunction } from 'express';
import * as aiService from '../services/aiService';
import { pressureSchema } from '../models/pressureModel';
import { z } from 'zod';

export const analyzePressure = async (req: Request<{}, {}, z.infer<typeof pressureSchema>>, res: Response, next: NextFunction) => {
    try {
        const { records } = req.body;

        const analysisResult = await aiService.analyzeBloodPressure(records);

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