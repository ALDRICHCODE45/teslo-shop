"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface args {
  userId: string;
  newRole: string;
}

export const changeUserRole = async ({ newRole, userId }: args) => {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return {
      ok: false,
      msg: "you must be authenticated as an admin",
    };
  }

  try {
    const role = newRole == "admin" ? "admin" : "user";
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role,
      },
    });
    revalidatePath("/admin/users");
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      msg: "no se pudo actualizar el role",
    };
  }
};
