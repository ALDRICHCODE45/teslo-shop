"use server";
import prisma from "@/lib/prisma";
import { hashSync } from "bcryptjs";

interface UserToCreate {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async ({ email, name, password }: UserToCreate) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashSync(password),
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    return {
      ok: true,
      user,
      msg: "user created",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      msg: "something went wrong",
    };
  }
};
