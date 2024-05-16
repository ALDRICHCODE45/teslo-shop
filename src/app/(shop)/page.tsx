import { redirect } from "next/navigation";

import { productPaginationWithImages } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await productPaginationWithImages({ page });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title title="Tienda" subTitle="Todos los productos" className="mb-2" />

      <ProductsGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
