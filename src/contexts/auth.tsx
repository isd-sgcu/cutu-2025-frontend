'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  getUser,
  login as sendLogin,
  register as sendRegister,
  edit as sendEdit,
  setAuthData,
} from '@/utils/auth';

import { useLiff } from './liff';
import { Result } from '@/utils/error';
import { AuthToken } from '@/schema/auth';
import { User } from '@/schema/user';
import { LoginResp } from '@/schema/login';
import { RegisterReq, RegisterResp } from '@/schema/register';
import { EditReq } from '@/schema/edit';

interface AuthState {
  user: User | undefined;
  token: AuthToken | undefined;
  isLoggedIn: boolean;
  loginError: Error | undefined;
  registerError: Error | undefined;
  editError: Error | undefined;
  isLoggingIn: boolean;
  isRegistering: boolean;
  isEditing: boolean;
  isInitialized: boolean;
  login(): Promise<Result<LoginResp>>;
  edit(req: EditReq): Promise<Result<null>>;
  register(req: RegisterReq): Promise<Result<RegisterResp>>;
}

const AuthContext = createContext<AuthState>({} as AuthState);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({
    user: undefined as User | undefined,
    token: undefined as AuthToken | undefined,
    isLoggedIn: false,
    loginError: undefined as Error | undefined,
    registerError: undefined as Error | undefined,
    editError: undefined as Error | undefined,
    isLoggingIn: false,
    isRegistering: false,
    isEditing: false,
    isInitialized: false,
  });
  const { client } = useLiff();

  type State = typeof state;
  function set(key: keyof State, val: State[keyof State]) {
    setState(prev => ({ ...prev, [key]: val }));
  }

  async function login(): Promise<Result<User & AuthToken>> {
    const context = client?.getContext();
    const userId = context?.userId;
    if (!userId) {
      const error = new Error('login error: user id is undefined');
      console.error(error.message);
      return { success: false, error: error };
    }

    console.log('start login');
    set('isLoggingIn', true);
    const loginResp = await sendLogin(userId);

    if (loginResp.success) {
      set('token', loginResp.result);
    } else {
      console.error('login failed:', loginResp.error);
      set('loginError', loginResp.error);
      set('isLoggingIn', false);
      return loginResp;
    }

    const UserResp = await getUser(userId);
    if (UserResp.success) {
      set('user', UserResp.result);
    } else {
      console.error('get user failed:', UserResp.error);
      set('loginError', UserResp.error);
      set('isLoggingIn', false);
      return UserResp;
    }

    set('isLoggingIn', false);

    return {
      success: true,
      result: { ...UserResp.result, ...loginResp.result },
    };
  }

  async function register(data: RegisterReq) {
    set('isRegistering', true);
    const resp = await sendRegister(data);

    if (resp.success) {
      setAuthData(resp.result);
    } else {
      console.error('register faild:', resp.error);
      set('registerError', resp.error);
      return resp;
    }

    set('isRegistering', false);
    return await login();
  }

  async function edit(data: RegisterReq) {
    if (!state.token?.accessToken) {
      const error = new Error(state.token?.accessToken);
      console.error('Failed edit:', error);
      return { success: false, error } as Result<null>;
    }
    set('isEditing', true);
    const resp = await sendEdit(data, state.token.accessToken);

    if (!resp.success) {
      console.error('edit faild:', resp.error);
      set('editError', resp.error);
    }

    set('isEditing', false);
    return resp;
  }

  useEffect(() => {
    login();
    set('isInitialized', true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        edit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
