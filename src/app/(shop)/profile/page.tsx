import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { EditProfileForm } from "./ui/EditProfileForm";

export interface ProfilepageProps {}

export default async function Profilepage({}: ProfilepageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  return (
    <>
      <EditProfileForm
        email={session.user.email}
        name={session.user.name}
        userId={session.user.id}
      />
    </>
  );
}
