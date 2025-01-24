import { z } from 'zod';
import { universities } from '../data/universities';
import { faculties } from '../data/faculties';
import { status } from '@/data/status';
import { educations } from '@/data/educations';
import { sizeJersey } from '@/data/size';

export const RegisterSchema = z.object({
  name: z.string().min(1, 'กรุณากรอกชื่อ-นามสกุล'),
  email: z.string().email('กรุณากรอกอีเมล'),
  phone: z.string().regex(/^\d+$/, 'กรุณากรอกเลข 0-9 เท่านั้น'),
  birthdate: z.date({
    message: 'กรุณากรอกวันเกิด',
  }),
  sizeJersey: z.enum(sizeJersey, {
    message: 'กรุณาเลือกขนาดเสื้อ',
  }),
  education: z.enum(educations, { message: 'กรุณาเลือกการศึกษา' }),
  foodLimitation: z.string(),
  disease: z.string(),
  drugAllegy: z.string(),
  image: z
    .instanceof(File, {
      message: 'กรุณาอัพโหลดรูปบัตรประชาชน',
    })
    .refine(file => {
      return ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
    }, 'กรุณาอัพโหลดเฉพาะ .jpg, .png, .webp'),
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
  isConfirm: z
    .boolean({ message: 'กรุณากดยืนยันข้อมูล' })
    .refine(value => value, { message: 'กรุณากดยืนยันข้อมูล' })
    .nullable(),
});

export type RegisterForm = z.infer<typeof RegisterSchema>;

export interface RegisterReq extends RegisterForm {
  id: string;
}

export const RegisterRespSchema = z.object({
  accessToken: z.string(),
  userId: z.string(),
});

export type RegisterResp = z.infer<typeof RegisterRespSchema>;
