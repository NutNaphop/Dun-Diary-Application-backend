import { z } from 'zod';

const recordSchema = z.object({
    sys: z.number().min(50, "ค่าความดันตัวบนต่ำเกินไป").max(250, "ค่าความดันตัวบนสูงเกินไป"),
    dia: z.number().min(30, "ค่าความดันตัวล่างต่ำเกินไป").max(150, "ค่าความดันตัวล่างสูงเกินไป"),
    pulse: z.number().min(30, "ชีพจรต่ำเกินไป").max(200, "ชีพจรสูงเกินไป"),
    date: z.iso.datetime({ message: "รูปแบบวันที่ไม่ถูกต้อง (ISO 8601)" }),
});


export const pressureSchema = z.object({
    records: z.array(recordSchema).min(1, "กรุณาส่งข้อมูลอย่างน้อย 1 รายการ"),
});

export type PressureRecord = z.infer<typeof recordSchema>;
