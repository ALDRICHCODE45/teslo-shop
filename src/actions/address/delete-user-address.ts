"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    const addressInDB = await prisma.userAddress.findUnique({
      where: { userId },
    });
    if (!addressInDB) return;

    await prisma.userAddress.delete({ where: { userId } });
  } catch (e) {
    /* handle error */
    console.log(e);
    throw e;
  }
};
