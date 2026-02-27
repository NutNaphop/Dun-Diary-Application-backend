import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate = (schema: z.ZodTypeAny) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    success: false,
                    message: "ข้อมูลที่ส่งมาไม่ถูกต้อง",
                    errors: error.issues.map(e => ({ path: e.path, message: e.message }))
                });
            }
            next(error);
        }
    };