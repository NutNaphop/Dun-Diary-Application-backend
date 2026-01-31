import { Request, Response, NextFunction } from 'express';
import * as aiService from '../services/aiService';
import { PressureInput } from '../models/pressureModel';

export const analyzePressure = async (req: Request<{}, {}, PressureInput>, res: Response, next: NextFunction) => {
    try {
        const { systolic, diastolic, pulse } = req.body;

        const analysisResult = await aiService.analyzeBloodPressure(systolic, diastolic, pulse);

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