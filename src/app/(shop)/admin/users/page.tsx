import { getPaginatedUser } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

export interface pageProps {}

export default async function page({}: pageProps) {
  const { ok, users = [] } = await getPaginatedUser();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Users" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>
    </>
  );
}
