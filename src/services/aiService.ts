import OpenAI from 'openai';
import 'dotenv/config';
import { CONSTANTS } from '../config/constants';
import { PROMPTS } from '../config/prompts';


const client = new OpenAI({
    apiKey: process.env.TYPHOON_API_KEY,
    baseURL: process.env.TYPHOON_BASE_URL || "https://api.opentyphoon.ai/v1"
});

export async function analyzeBloodPressure(
    sys: number,
    dia: number,
    pulse: number
): Promise<any> {
    const testPromt: string = PROMPTS.BLOOD_PRESSURE_PROMPT(sys, dia, pulse);
    try {

        const response = await client.chat.completions.create({
            model: CONSTANTS.AI_MODEL,
            messages: [
                { role: "system", content: PROMPTS.SYSTEM_INSTRUCTION },
                { role: "user", content: testPromt }
            ],
            max_completion_tokens: CONSTANTS.MAX_TOKEN,
            temperature: CONSTANTS.TEMPERATURE,
        });

        const content = response.choices[0].message.content || "{}";
        return JSON.parse(content);
    } catch (error: any) {
        console.error("❌ Error while using AI:", error.message);
        throw new Error(CONSTANTS.ERRORS.AI_SERVICE_DOWN);
    }
}