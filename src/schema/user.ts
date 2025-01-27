import { educations } from '@/const/educations';
import { faculties } from '@/const/faculties';
import { roles } from '@/const/role';
import { sizeJersey } from '@/const/size';
import { status } from '@/const/status';
import { universities } from '@/const/universities';
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  education: z.enum(educations),
  email: z.string(),
  faculty: z.enum(faculties),
  foodLimitation: z.string(),
  graduatedYear: z.string(),
  imageURL: z.string(),
  invitationCode: z.string(),
  lastEntered: z.string(),
  phone: z.string(),
  role: z.enum(roles),
  sizeJersey: z.enum(sizeJersey),
  status: z.enum(status),
  university: z.enum(universities),
  age: z
    .string({
      message: 'กรุณากรอกอายุ',
    })
    .regex(/^\d+$/, 'กรุณากรอกเลข 0-9 เท่านั้น'),
  drugAllergy: z.string(),
  chronicDisease: z.string(),
});

export type User = z.infer<typeof UserSchema>;
