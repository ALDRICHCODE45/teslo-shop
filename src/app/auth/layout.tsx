import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export interface ShopLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: ShopLayoutProps) {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }
  return (
    <>
      <main className="flex justify-center">
        <div className="w-full sm:w-[350px] px-10">{children}</div>
      </main>
    </>
  );
}
