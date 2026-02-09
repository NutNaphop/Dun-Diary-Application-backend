// src/models/pressureModel.ts
import { z } from 'zod';

// Schema สำหรับข้อมูลที่ aggregate แล้วแต่ละช่วง (วัน/สัปดาห์/เดือน)
const pressureItemSchema = z.object({
    label: z.string(),
    avgSys: z.number(),
    avgDia: z.number(),
    avgPulse: z.number(),
    minSys: z.number(),
    maxSys: z.number(),
    minDia: z.number(),
    maxDia: z.number(),
    count: z.number(),
    level: z.number().min(0).max(5),
});

// Schema หลักสำหรับ request body
export const pressureSchema = z.object({
    periodType: z.enum(['week', 'month', 'year']),
    rangeLabel: z.string(),
    totalRecords: z.number().min(1, "กรุณาส่งข้อมูลอย่างน้อย 1 รายการ"),
    items: z.array(pressureItemSchema).min(1, "กรุณาส่งข้อมูลอย่างน้อย 1 รายการ"),
});

export type PressureItem = z.infer<typeof pressureItemSchema>;
export type PressureData = z.infer<typeof pressureSchema>;
