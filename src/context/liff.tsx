'use client';

import liff, { Liff } from '@line/liff';
import { createContext, useContext, useEffect, useState } from 'react';
import { config } from '../app/config';

interface LiffContextState {
  client: Liff | null;
  error: Error | null;
  isInitializing: boolean;
}

const initialState: LiffContextState = {
  client: null,
  error: null,
  isInitializing: true,
};

export const liffContext = createContext<LiffContextState>(initialState);
export const useLiff = () => useContext(liffContext);

export default function LineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<LiffContextState>(initialState);

  async function init() {
    try {
      await liff.init({ liffId: config.liffId });
      setState({
        client: liff,
        error: null,
        isInitializing: false,
      });

      if (!liff.isLoggedIn()) {
        liff.login();
      }
    } catch (error) {
      setState({
        client: null,
        error:
          error instanceof Error
            ? error
            : new Error('Failed to initialize LIFF'),
        isInitializing: false,
      });
    }
  }

  useEffect(() => {
    init();

    return () => {
      if (liff.isLoggedIn()) {
        liff.logout();
      }
    };
  }, []);

  return (
    <liffContext.Provider value={state}>
      {state.isInitializing ? <div>loading...</div> : children}
    </liffContext.Provider>
  );
}
