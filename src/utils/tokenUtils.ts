import { CONSTANTS } from '../config/constants';

/**
 * ประมาณจำนวน tokens จาก text (ภาษาไทย ~3 chars per token)
 */
export function estimateTokens(text: string): number {
    return Math.ceil(text.length / CONSTANTS.CHARS_PER_TOKEN);
}

/**
 * คำนวณ max_completion_tokens ที่ปลอดภัย
 * @returns จำนวน tokens สำหรับ output หรือ throw error ถ้า input ยาวเกินไป
 */
export function calculateMaxCompletionTokens(inputText: string): number {
    const inputTokens = estimateTokens(inputText);
    const availableForOutput = CONSTANTS.MODEL_MAX_TOKENS - inputTokens;

    // ถ้า input ยาวเกินจนเหลือ output ไม่พอ
    if (availableForOutput < CONSTANTS.MIN_OUTPUT_TOKENS) {
        throw new Error(CONSTANTS.ERRORS.INPUT_TOO_LONG);
    }

    // คืนค่าที่เหลือ แต่ไม่เกิน MAX_TOKEN ที่กำหนด
    return Math.min(availableForOutput, CONSTANTS.MAX_TOKEN);
}
