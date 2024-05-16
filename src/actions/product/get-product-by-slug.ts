"use server";
import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        productImage: {
          select: { url: true, productId: true, id: true },
        },
      },
      where: {
        slug,
      },
    });
    if (!product) return null;

    return {
      ...product,
      images: product.productImage.map((image) => image.url),
    };
  } catch (e) {
    /* handle error */
    throw new Error("something's wrong");
  }
};
