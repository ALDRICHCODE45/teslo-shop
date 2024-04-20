"use client";
import { SessionProvider } from "next-auth/react";

export interface UserProviderProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: UserProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
