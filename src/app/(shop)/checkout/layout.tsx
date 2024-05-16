import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export interface layoutProps {
  children: React.ReactNode;
}

export default async function layout({ children }: layoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
