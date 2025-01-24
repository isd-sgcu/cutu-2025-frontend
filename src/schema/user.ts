import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  education: z.string(),
  email: z.string(),
  faculty: z.string(),
  foodLimitation: z.string(),
  graduatedYear: z.string(),
  imageURL: z.string(),
  invitationCode: z.string(),
  lastEntered: z.string(),
  phone: z.string(),
  role: z.string(),
  sizeJersey: z.string(),
  status: z.string(),
  university: z.string(),
});

export type User = z.infer<typeof UserSchema>;
