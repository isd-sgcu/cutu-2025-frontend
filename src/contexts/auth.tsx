'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  AuthData,
  LoginResp,
  RegisterReq,
  RegisterResp,
  login as sendLogin,
  register as sendRegister,
} from '@/utils/auth';

import { useLiff } from './liff';
import { Result } from '@/utils/error';

interface AuthState {
  data: AuthData | null;
  isLoggedIn: boolean;
  loginError: Error | null;
  registerError: Error | null;
  login(): Promise<Result<LoginResp>>;
  register(req: RegisterReq): Promise<Result<RegisterResp>>;
}

const AuthContext = createContext<AuthState>({} as AuthState);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AuthData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<Error | null>(null);
  const [registerError, setRegisterError] = useState<Error | null>(null);
  const { client } = useLiff();

  async function login(): Promise<Result<LoginResp>> {
    if (!client?.id) {
      const error = new Error('login error: liff id is null');
      console.error(error.message);
      return { success: false, error: error };
    }

    const resp = await sendLogin(client.id);
    if (resp.success) {
      setData(resp.result);
      setIsLoggedIn(true);
    } else {
      console.error('login faild:', resp.error);
      setLoginError(resp.error);
    }

    return resp;
  }

  async function register(data: RegisterReq) {
    const resp = await sendRegister(data);

    if (resp.success) {
      setData(resp.result);
      setIsLoggedIn(true);
    } else {
      console.error('register faild:', resp.error);
      setRegisterError(resp.error);
    }

    return resp;
  }

  useEffect(() => {
    login();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        data,
        isLoggedIn,
        loginError,
        registerError,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
