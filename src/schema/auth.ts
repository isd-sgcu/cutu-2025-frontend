import { z } from 'zod';

export const AuthTokenSchema = z.object({
  accessToken: z.string(),
  userId: z.string(),
});

export type AuthToken = z.infer<typeof AuthTokenSchema>;
