// src/config/prompts.ts

export const PROMPTS = {

    BLOOD_PRESSURE_PROMPT: (sys: number, dia: number, pulse: number): string => `
   คุณเป็นผู้เชี่ยวชาญด้านสุขภาพ หน้าที่คือวิเคราะห์ค่าความดันโลหิตของผู้ใช้งาน
    
    ข้อมูลผู้ใช้:
    - ความดันตัวบน (Systolic): ${sys} mmHg
    - ความดันตัวล่าง (Diastolic): ${dia} mmHg
    - อัตราการเต้นของหัวใจ (Pulse): ${pulse} ครั้ง/นาที

    คำสั่ง:
    1. สรุปผลมาแบบเข้าใจง่ายๆ สั้นๆเข้าใจง่าย
    2. ประเมินระดับความรุนแรง (เช่น ต่ำ, ปกติ, เริ่มสูง, สูง, สูงมาก) ตามเกณฑ์มาตรฐาน WHO
    3. ขอคำแนะนำในการปฏิบัติตัว 1-2 ข้อสั้นๆ เข้าใจง่าย เป็นกันเอง
    4. เกณฑ์อ้างอิงโดยเป็นชื่อองค์กร
    4. ตอบเป็นภาษาไทยในรูปแบบ JSON

    วิเคราะห์ผลและตอบเป็น JSON เท่านั้น ตามโครงสร้างนี้:
    {
        "summary": "",
        "level": "",
        "suggest": [],
        "reference" ""
    }
    `,

    SYSTEM_INSTRUCTION: `
    You are a helpful and empathetic medical assistant. 
    RULES:
        1. Analyze input and respond in THAI language only.
        2. Output MUST be a raw JSON object.
        3. NO markdown (no \`\`\`json), NO conversational filler.`
};
