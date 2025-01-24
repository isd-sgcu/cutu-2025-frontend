import { Result } from '@/utils/error';
import { User } from '../_schema/user';
import { z } from 'zod';

export interface RegisterReq extends User {
  id: string;
}

export const RegisterRespSchema = z.object({
  accessToken: z.string(),
  userId: z.string(),
});

export type RegisterResp = z.infer<typeof RegisterRespSchema>;

export const authKey = 'auth-data';

export async function registerUser(
  req: RegisterReq,
): Promise<Result<RegisterResp>> {
  console.log('request:', req);
  const isError = Math.random() >= 0;
  if (isError) {
    return { success: false, error: new Error('mock error') };
  } else {
    return {
      success: true,
      result: { accessToken: 'mock accessToken', userId: 'mock userId' },
    };
  }
}
