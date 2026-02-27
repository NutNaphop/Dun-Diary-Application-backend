import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

const serviceAccount = require('../config/serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'กรุณาเข้าสู่ระบบ (No Token Provided)' });
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        (req as any).user = decodedToken;

        next();

    } catch (error) {
        console.error("Auth Error:", error);
        return res.status(401).json({ success: false, message: 'Token ไม่ถูกต้อง หรือหมดอายุ' });
    }
};