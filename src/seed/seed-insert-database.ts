import prisma from "../lib/prisma";

import { initialData } from "./seed";

async function main() {
  //1.Borrar registros previos
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  //categories
  const categoriesData = initialData.categories.map((name) => ({ name }));

  await prisma.category.createMany({
    data: categoriesData,
  });
  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  //products

  const products = initialData.products;

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    const imagesData = images.map((image) => ({
      url: image,
      produtId: dbProduct.id,
    }));
    await prisma.productImage.createMany({ data: imagesData });
  });

  //users
  const users = initialData.users;
  await prisma.user.createMany({
    data: users,
  });
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
