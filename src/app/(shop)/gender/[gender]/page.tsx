import { productPaginationWithImages } from "@/actions";

import { Pagination, ProductsGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

export interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page: string;
  };
}

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = params;
  //if (id === "kids") {
  // notFound();
  //}
  const idTraductions: Record<string, string> = {
    men: "hombres",
    women: "mujeres",
    kid: "niños",
    unisex: "todos",
  };

  const title = idTraductions[gender];

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await productPaginationWithImages({
    page: page,
    gender: gender as Gender,
  });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title
        title={`Articulos de ${title}`}
        subTitle="todos los productos"
        className="mb-2"
      />

      <ProductsGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
