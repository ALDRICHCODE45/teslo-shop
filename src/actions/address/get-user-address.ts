"use server";

import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
  try {
    const userAddressStored = await prisma.userAddress.findUnique({
      where: { userId },
    });
    if (!userAddressStored) return null;
    const { countryId, ...rest } = userAddressStored;
    return {
      ...rest,
      country: countryId,
    };
  } catch (e) {
    /* handle error */
    console.log(e);
    return null;
  }
};
