"use server";

import prisma from "@/lib/prisma";

interface args {
  name?: string;
  email?: string;
  userId: string;
}

export const updateProfile = async ({ email, name, userId }: args) => {
  try {
    console.log({ email, name, userId });
    const userInDb = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!userInDb) {
      return {
        ok: false,
        msg: "user does not exist",
      };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { email, name },
    });

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};
