import { z } from 'zod';

import { status } from '@/const/status';
import { educations } from '@/const/educations';
import { sizeJersey } from '@/const/size';
import { universities } from '@/const/universities';
import { faculties } from '@/const/faculties';

export const EditSchema = z.object({
  name: z.string().min(1, 'กรุณากรอกชื่อ-นามสกุล'),
  email: z.string().email('กรุณากรอกอีเมล'),
  phone: z.string().regex(/^\d+$/, 'กรุณากรอกเลข 0-9 เท่านั้น'),
  age: z
    .string({
      message: 'กรุณากรอกอายุ',
    })
    .regex(/^\d+$/, 'กรุณากรอกเลข 0-9 เท่านั้น'),
  sizeJersey: z.enum(sizeJersey, {
    message: 'กรุณาเลือกขนาดเสื้อ',
  }),
  education: z.enum(educations, { message: 'กรุณาเลือกการศึกษา' }),
  foodLimitation: z.string(),
  chronicDisease: z.string(),
  drugAllergy: z.string(),
  university: z.enum(universities, {
    message: 'กรุณาเลือกมหาวิทยาลัย',
  }),
  status: z.enum(status, {
    message: 'กรุณาเลือกสถานะ',
  }),
  graduatedYear: z
    .string({ message: 'กรุณากรอกปีที่สำเร็จการศึกษา' })
    .regex(/^\d{4}$/, { message: 'กรุณากรอกปีที่สำเร็จการศึกษา' }),
  faculty: z.enum([...faculties, 'ไม่ระบุ'], {
    message: 'กรุณาเลือกคณะที่สำเร็จการศึกษา',
  }),
});

export type EditForm = z.infer<typeof EditSchema>;

export interface EditReq extends EditForm {
  id: string;
}
