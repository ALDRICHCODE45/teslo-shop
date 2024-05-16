import { titleFont } from "@/config/fonts";
import { Metadata } from "next";
import { RegisterForm } from "./ui/RegisterForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function NewAccount() {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Crear cuenta</h1>
      <RegisterForm />
    </main>
  );
}
