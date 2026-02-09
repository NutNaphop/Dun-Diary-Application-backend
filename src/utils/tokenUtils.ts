// src/utils/tokenUtils.ts
import { CONSTANTS } from '../config/constants';
import { logger } from './logger';

/**
 * ประมาณจำนวน tokens จาก text (ภาษาไทย ~3 chars per token)
 */
export function estimateTokens(text: string): number {
    return Math.ceil(text.length / CONSTANTS.CHARS_PER_TOKEN);
}

/**
 * คำนวณ max_completion_tokens สำหรับ Typhoon API
 * Note: Typhoon ใช้ max_completion_tokens = input + output รวมกัน
 * @returns จำนวน tokens (input + output) หรือ throw error ถ้าเกิน limit
 */
export function calculateMaxCompletionTokens(inputText: string): number {
    const inputTokens = estimateTokens(inputText);
    const desiredOutputTokens = CONSTANTS.MIN_OUTPUT_TOKENS;
    const totalRequired = inputTokens + desiredOutputTokens;

    logger.info(`📊 Token estimation: input ~${inputTokens}, desired output: ${desiredOutputTokens}, total: ${totalRequired}`);

    if (totalRequired > CONSTANTS.MODEL_MAX_TOKENS) {
        logger.warn(`⚠️ Token limit exceeded! Required ${totalRequired}, max ${CONSTANTS.MODEL_MAX_TOKENS}`);
        throw new Error(CONSTANTS.ERRORS.INPUT_TOO_LONG);
    }

    const maxTokens = Math.min(inputTokens + CONSTANTS.MAX_TOKEN, CONSTANTS.MODEL_MAX_TOKENS);

    logger.info(`🎯 Using max_completion_tokens: ${maxTokens} (input: ${inputTokens} + buffer: ${maxTokens - inputTokens})`);

    return maxTokens;
}
