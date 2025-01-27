import {
  getLocalStorageObj,
  LocalStorageKey,
  setLocalStorageObj,
} from './localstorage';

import { AuthToken, AuthTokenSchema } from '@/schema/auth';
import { RegisterReq, RegisterResp } from '@/schema/register';
import { User } from '@/schema/user';
import { LoginResp } from '@/schema/login';
import { EditReq } from '@/schema/edit';
import { Result } from '@/utils/error';

import { AxiosError } from 'axios';
import { apiClient } from './axios';
import { ErrorDTO } from '@/schema/error';

export const authKey: LocalStorageKey = 'auth-data';

export function getAuthData(): AuthToken | null {
  const { success, data } = AuthTokenSchema.safeParse(
    getLocalStorageObj(authKey),
  );
  return success ? data : null;
}

export function setAuthData(data: AuthToken) {
  setLocalStorageObj(authKey, data);
}

export async function register(
  req: RegisterReq,
): Promise<Result<RegisterResp>> {
  try {
    const res = await apiClient.postForm<RegisterResp>('/users/register', req);
    return { success: true, result: res.data };
  } catch (raw: unknown) {
    const error = raw as AxiosError<ErrorDTO>;
    return {
      success: false,
      error: new Error(error.response?.data.error || error.message),
    };
  }
}

export const login = async (id: string): Promise<Result<LoginResp>> => {
  try {
    const resp = await apiClient.post(`/users/signin`, `"${id}"`, {
      headers: {
        'Content-Type': 'apllcation/json',
      },
    });
    setAuthData(resp.data);
    return { success: true, result: resp.data };
  } catch (raw: unknown) {
    const error = raw as AxiosError<ErrorDTO>;
    return {
      success: false,
      error: new Error(
        error.response ? error.response.data.error : error.message,
      ),
    };
  }
};

export async function getUser(id: string): Promise<Result<User>> {
  try {
    const resp = await apiClient.get<User>(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthData()?.accessToken}`,
      },
    });
    return { success: true, result: resp.data };
  } catch (raw: unknown) {
    const error = raw as AxiosError<ErrorDTO>;
    return {
      success: false,
      error: new Error(
        error.response ? error.response.data.error : error.message,
      ),
    };
  }
}

export async function edit(
  req: EditReq,
  accessToken: string,
): Promise<Result<null>> {
  try {
    await apiClient.patch(`/users`, req, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { success: true, result: null };
  } catch (raw: unknown) {
    const error = raw as AxiosError<ErrorDTO>;
    if (error.response) {
      return {
        success: false,
        error: new Error(error.response.data.error),
      };
    } else {
      return { success: false, error: new Error(error.message) };
    }
  }
}
