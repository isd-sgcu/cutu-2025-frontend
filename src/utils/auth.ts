import { Result } from '@/utils/error';
import { z } from 'zod';
import {
  getLocalStorageObj,
  LocalStorageKey,
  setLocalStorageObj,
} from './localstorage';
import { User } from '@/app/(user)/register/_schema/user';

export type AuthData = {
  accessToken: string;
  userId: string;
};

export const authKey: LocalStorageKey = 'auth-data';

export function getAuthData(): AuthData | null {
  return getLocalStorageObj(authKey);
}

export function setAuthData(data: AuthData) {
  setLocalStorageObj(authKey, data);
}

export interface RegisterReq extends User {
  id: string;
}

export const RegisterRespSchema = z.object({
  accessToken: z.string(),
  userId: z.string(),
});

export type RegisterResp = z.infer<typeof RegisterRespSchema>;

export async function register(
  req: RegisterReq,
): Promise<Result<RegisterResp>> {
  const isError = Math.random() >= 0.5;
  if (isError) {
    return { success: false, error: new Error('register error') };
  } else {
    const data = {
      accessToken: 'mock accessToken',
      userId: 'mock userId' + req,
    };
    setAuthData(data);
    return {
      success: true,
      result: data,
    };
  }
}

export const LoginRespSchema = z.object({
  accessToken: z.string(),
  userId: z.string(),
});

export type LoginResp = z.infer<typeof LoginRespSchema>;

export const login = async (id: string): Promise<Result<LoginResp>> => {
  const isError = Math.random() >= 0.5;
  if (isError) {
    return { success: false, error: new Error('login error') };
  } else {
    const data = { accessToken: 'mock accessToken', userId: id };
    setAuthData(data);
    return {
      success: true,
      result: data,
    };
  }
};
