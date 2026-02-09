// src/config/prompts.ts
import { PressureData } from '../models/pressureModel';

export const PROMPTS = {

    BLOOD_PRESSURE_PROMPT: (data: PressureData): string => `
    คุณเป็นผู้เชี่ยวชาญด้านสุขภาพ หน้าที่คือวิเคราะห์ค่าความดันโลหิตของผู้ใช้งานจากข้อมูลสรุปที่ได้รับ
    
    ข้อมูลสรุป${data.periodType === 'week' ? 'รายสัปดาห์' : data.periodType === 'month' ? 'รายเดือน' : 'รายปี'}:
    - ช่วงเวลา: ${data.rangeLabel}
    - จำนวนการบันทึกทั้งหมด: ${data.totalRecords} ครั้ง
    
    ข้อมูลค่าเฉลี่ย${data.periodType === 'week' ? 'รายวัน' : data.periodType === 'month' ? 'รายสัปดาห์' : 'รายเดือน'}:
    ${JSON.stringify(data.items, null, 2)}

    คำสั่ง:
    1. สรุปภาพรวมและแนวโน้มของความดันโลหิตจากข้อมูลทั้งหมดโดยตอบออกมาให้กระชับ เหมาะกับบุคคลทั่วไป ไม่ทำให้ตกใจ
    2. **เกณฑ์อ้างอิง (Reference):** ใช้เกณฑ์มาตรฐานสากลของ **AHA/ACC**
       - 0 Hypotension (Low): < 90/60 (ให้เตือนเฉพาะกรณีที่มีความเสี่ยงหน้ามืด)
       - 1 Normal: < 120/80
       - 2 Elevated: 120-129/<80
       - 3 High BP (Stage 1): 130-139/80-89
       - 4 High BP (Stage 2): >= 140/90
       - 5 High BP (Stage 3): >= 180/120
    3. เลือกค่า "risk_level" ที่แย่ที่สุดที่พบในช่วงนี้ เพื่อแจ้งเตือน (ดูจาก level ใน items)
    4. ขอคำแนะนำ 1-2 ข้อ (สั้น, กระชับ, ภาษาพูดที่สุภาพ)

    วิเคราะห์ผลและตอบเป็น JSON เท่านั้น ตามโครงสร้างนี้:
    {
        "summary": "",
        "risk_level": "",
        "suggest": [],
        "reference": "American Heart Association (AHA)"
    }
    `.trim(),

    SYSTEM_INSTRUCTION: `
    You are a helpful and empathetic medical assistant. 
    RULES:
        1. Analyze input and respond in THAI language only.
        2. Output MUST be a raw JSON object.
        3. NO markdown (no \`\`\`json), NO conversational filler.`.trim()
};
