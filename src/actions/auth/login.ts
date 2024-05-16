"use server";

import { signIn } from "@/auth.config";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "Success";
  } catch (error) {
    console.log(error);

    return "CredentialsSignin";
  }
}

interface UserToLogIn {
  email: string;
  password: string;
}

export const login = async ({ email, password }: UserToLogIn) => {
  try {
    await signIn("credentials", { email, password });
    return {
      ok: true,
      msg: "user logged",
    };
  } catch (e) {
    /* handle error */
    console.log(e);
    return {
      ok: false,
      msg: "something went wrong",
    };
  }
};
