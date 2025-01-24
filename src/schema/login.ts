import { z } from 'zod';

export const LoginRespSchema = z.object({
  accessToken: z.string(),
  userId: z.string(),
});

export type LoginResp = z.infer<typeof LoginRespSchema>;
