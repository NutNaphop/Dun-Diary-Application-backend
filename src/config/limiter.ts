import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
    windowMs: 9000,
    max: 50,
    message: {
        success: false,
        message: "เรียกใช้งานบ่อยเกินไป กรุณาลองใหม่ในอีก 15 นาที"
    }
});