import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export interface ProfilepageProps {}

export default async function Profilepage({}: ProfilepageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  return (
    <>
      <div className="">
        <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      </div>
    </>
  );
}
