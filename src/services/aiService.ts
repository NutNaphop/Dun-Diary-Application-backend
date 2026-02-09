import OpenAI from 'openai';
import 'dotenv/config';
import { CONSTANTS } from '../config/constants';
import { PROMPTS } from '../config/prompts';
import { logger } from '../utils/logger';
import { calculateMaxCompletionTokens } from '../utils/tokenUtils';
import { PressureRecord } from '../models/pressureModel';


const client = new OpenAI({
    apiKey: process.env.TYPHOON_API_KEY,
    baseURL: process.env.TYPHOON_BASE_URL || "https://api.opentyphoon.ai/v1"
});

export async function analyzeBloodPressure(
    records: PressureRecord[]
): Promise<any> {
    const userPrompt: string = PROMPTS.BLOOD_PRESSURE_PROMPT(records);
    const fullInputText = PROMPTS.SYSTEM_INSTRUCTION + userPrompt;

    try {
        const maxTokens = calculateMaxCompletionTokens(fullInputText);
        logger.info(`🎯 Using max_completion_tokens: ${maxTokens}`);

        const response = await client.chat.completions.create({
            model: CONSTANTS.AI_MODEL,
            messages: [
                { role: "system", content: PROMPTS.SYSTEM_INSTRUCTION },
                { role: "user", content: userPrompt }
            ],
            max_completion_tokens: maxTokens,
            temperature: CONSTANTS.TEMPERATURE,
            response_format: { type: "json_object" }
        });

        let content = response.choices[0].message.content || "{}";

        // Extract JSON if the AI wraps it in markdown code blocks or other text
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            content = jsonMatch[0];
        }
        return JSON.parse(content);
    } catch (error: any) {
        logger.error("❌ Error while using AI:", error);

        // ถ้าเป็น error จาก token calculation ให้ throw ต่อไปเลย
        if (error.message === CONSTANTS.ERRORS.INPUT_TOO_LONG) {
            throw error;
        }

        throw new Error(CONSTANTS.ERRORS.AI_SERVICE_DOWN);
    }
}