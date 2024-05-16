"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId: transactionId },
    });
    if (!order) {
      return {
        ok: false,
        msg: "no se pudo encontrar la orden",
      };
    }
    return {
      ok: true,
      msg: "orden actualizada",
    };
  } catch (e) {
    /* handle error */
    return {
      ok: false,
      msg: "no se pudo actualizar la orden",
    };
  }
};
