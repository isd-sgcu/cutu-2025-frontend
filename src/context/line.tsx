"use client";

import liff, { Liff } from "@line/liff";
import { createContext, useContext, useEffect, useState } from "react";
import { config } from "../app/config";

export const LineContext = createContext<Liff | null>(null);
export const useLiff = () => useContext(LineContext);

export default function LineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [liffClient, setLiffClient] = useState<Liff | null>(null);

  useEffect(() => {
    liff
      .init({ liffId: config.liffId })
      .then(() => {
        setLiffClient(liff);
      })
      .catch((err) => {
        console.error("error init liff client", err);
      });
  });

  return (
    <LineContext.Provider value={liffClient}>{children}</LineContext.Provider>
  );
}
