import { SessionProvider } from "next-auth/react";
import { type ReactElement } from "react";

export interface UseSessionProviderProps {
  children: React.ReactNode;
}

export function UseSessionProvider({
  children,
}: UseSessionProviderProps): ReactElement {
  return <SessionProvider>{children}</SessionProvider>;
}
