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
  return new Promise<Result<RegisterResp>>(resolve => {
    setTimeout(() => {
      const data = {
        accessToken: 'mock accessToken',
        userId: 'mock userId' + req,
      };
      setAuthData(data);
      resolve({
        success: true,
        result: data,
      });
    }, 2000);
  });
}

export const login = async (id: string): Promise<Result<LoginResp>> => {
  const data = { accessToken: 'mock accessToken', userId: id };
  setAuthData(data);
  return {
    success: true,
    result: data,
  };
};

export async function getUser(id: string): Promise<Result<User>> {
  return new Promise<Result<User>>(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        result: {
          id: id,
          name: 'mock-name',
          education: 'mock-education',
          email: 'mock-email',
          faculty: 'mock-faculty',
          foodLimitation: 'mock-foodLimitation',
          graduatedYear: 'mock-graduatedYear',
          imageURL: 'mock-imageURL',
          invitationCode: 'mock-invitationCode',
          lastEntered: 'mock-lastEntered',
          phone: 'mock-phone',
          role: 'mock-role',
          sizeJersey: 'mock-sizeJersey',
          status: 'mock-status',
          university: 'mock-university',
        },
      });
    }, 2000);
  });
}

export async function edit(req: EditReq): Promise<Result<null>> {
  console.log('edit req: ', req);
  return new Promise<Result<null>>(resolve => {
    setTimeout(() => {
      resolve({ success: true, result: null });
    }, 2000);
  });
}
