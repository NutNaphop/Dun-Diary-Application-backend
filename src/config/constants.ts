// src/config/constants.ts
interface AppConstantsType {
    APP_NAME: string;
    API_VERSION: string;
    AI_MODEL: string;
    MAX_TOKEN: number;
    MODEL_MAX_TOKENS: number;      // Total token limit ของ model
    MIN_OUTPUT_TOKENS: number;     // Output tokens ขั้นต่ำที่ต้องการ
    CHARS_PER_TOKEN: number;       // อัตราส่วนสำหรับ estimate (ภาษาไทย ≈ 3)
    TEMPERATURE: number;
    ERRORS: {
        MISSING_INPUT: string;
        AI_SERVICE_DOWN: string;
        INPUT_TOO_LONG: string;
    };
}

export const CONSTANTS: AppConstantsType = {
    APP_NAME: 'Dun Diary',
    API_VERSION: 'v1',
    AI_MODEL: 'typhoon-v2.5-30b-a3b-instruct',
    MAX_TOKEN: 1500,
    MODEL_MAX_TOKENS: 4096,        // ปรับตาม model ที่ใช้
    MIN_OUTPUT_TOKENS: 800,        // output ขั้นต่ำที่ต้องการสำหรับ response
    CHARS_PER_TOKEN: 3,            // ภาษาไทย ~3 chars per token
    TEMPERATURE: 0.7,
    ERRORS: {
        MISSING_INPUT: 'กรุณากรอกข้อมูลความดันให้ครบถ้วน (Systolic, Diastolic, Pulse)',
        AI_SERVICE_DOWN: 'ระบบวิเคราะห์ AI กำลังปรับปรุงชั่วคราว',
        INPUT_TOO_LONG: 'ข้อมูลมากเกินไป กรุณาลดจำนวนรายการที่ส่งมา',
    }
};