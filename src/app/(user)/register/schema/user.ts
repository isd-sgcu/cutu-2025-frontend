import { z } from 'zod';
import { universities } from '../_data/universities';
import { faculties } from '../_data/faculties';
import { statuses } from '../_data/statuses';
import { sizes } from '../_data/size';
import { studies } from '../_data/studies';

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
  idCardImg: z
    .instanceof(File, {
      message: 'กรุณาอัพโหลดรูปบัตรประชาชน',
    })
    .refine(file => {
      return ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
    }, 'กรุณาอัพโหลดเฉพาะ .jpg, .png, .webp'),
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
  isConfirm: z
    .boolean({ message: 'กรุณากดยืนยันข้อมูล' })
    .refine(value => value, { message: 'กรุณากดยืนยันข้อมูล' })
    .nullable(),
});

export type User = z.infer<typeof UserSchema>;
