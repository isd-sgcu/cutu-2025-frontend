import { z } from 'zod';
import { sizes } from '../../register/_data/size';
import { studies } from '../../register/_data/studies';
import { universities } from '../../register/_data/universities';
import { statuses } from '../../register/_data/statuses';
import { faculties } from '../../register/_data/faculties';

export const UserSchema = z.object({
  fullname: z.string().min(1, 'กรุณากรอกชื่อ-นามสกุล'),
  email: z.string().email('กรุณากรอกอีเมล'),
  tel: z.string().regex(/^\d+$/, 'กรุณากรอกเลข 0-9 เท่านั้น'),
  birthdate: z.date({
    message: 'กรุณากรอกวันเกิด',
  }),
  size: z.enum(sizes, {
    message: 'กรุณาเลือกขนาดเสื้อ',
  }),
  study: z.enum(studies, { message: 'กรุณาเลือกการศึกษา' }),
  foodAllegy: z.string(),
  disease: z.string(),
  drugAllegy: z.string(),
  university: z.enum(universities, {
    message: 'กรุณาเลือกมหาวิทยาลัย',
  }),
  status: z.enum(statuses, {
    message: 'กรุณาเลือกสถานะ',
  }),
  graduateYear: z
    .string({ message: 'กรุณากรอกปีที่สำเร็จการศึกษา' })
    .regex(/^\d{4}$/, { message: 'กรุณากรอกปีที่สำเร็จการศึกษา' }),
  graduateFaculty: z.enum([...faculties, 'ไม่ระบุ'], {
    message: 'กรุณาเลือกคณะที่สำเร็จการศึกษา',
  }),
});

export type User = z.infer<typeof UserSchema>;
