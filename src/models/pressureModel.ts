import { z } from 'zod';

export const pressureSchema = z.object({
    systolic: z.number().min(50, "ค่าความดันตัวบนต่ำเกินไป").max(250, "ค่าความดันตัวบนสูงเกินไป"),
    diastolic: z.number().min(30, "ค่าความดันตัวล่างต่ำเกินไป").max(150, "ค่าความดันตัวล่างสูงเกินไป"),
    pulse: z.number().min(30, "ชีพจรต่ำเกินไป").max(200, "ชีพจรสูงเกินไป"),
});

// นี่คือ Type Inference: สร้าง Type จาก Schema อัตโนมัติ
export type PressureInput = z.infer<typeof pressureSchema>;