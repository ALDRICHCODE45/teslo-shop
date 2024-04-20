"use server";
import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface paginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const productPaginationWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: paginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  if (isNaN(Number(take))) take = 12;
  try {
    //1.get products
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        productImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      where: {
        gender: gender,
      },
    });

    //2.calculate total pages
    const totalProducts = await prisma.product.count({ where: { gender } });
    const totalPages = Math.ceil(totalProducts / take);

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.productImage.map((image) => image.url),
      })),
    };
  } catch (e) {
    /* handle error */
    throw Error("something's wrong");
  }
};
