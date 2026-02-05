// src/config/constants.ts
interface AppConstantsType {
    APP_NAME: string;
    API_VERSION: string;
    AI_MODEL: string;
    MAX_TOKEN: number;
    TEMPERATURE: number;
    ERRORS: {
        MISSING_INPUT: string;
        AI_SERVICE_DOWN: string;
    };
}

export const CONSTANTS: AppConstantsType = {
    APP_NAME: 'Dun Diary',
    API_VERSION: 'v1',
    AI_MODEL: 'typhoon-v2.5-30b-a3b-instruct',
    MAX_TOKEN: 1500,
    TEMPERATURE: 0.7,
    ERRORS: {
        MISSING_INPUT: 'กรุณากรอกข้อมูลความดันให้ครบถ้วน (Systolic, Diastolic, Pulse)',
        AI_SERVICE_DOWN: 'ระบบวิเคราะห์ AI กำลังปรับปรุงชั่วคราว',
    }
};