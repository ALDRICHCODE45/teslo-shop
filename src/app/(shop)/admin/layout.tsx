import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export interface AuthlayoutProps {
  children: React.ReactNode;
}

export default async function Authlayout({ children }: AuthlayoutProps) {
  const session = await auth();
  if (session?.user.role !== "admin") {
    redirect("/login");
  }
  return <>{children}</>;
}
