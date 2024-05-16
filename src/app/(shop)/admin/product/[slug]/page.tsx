import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "../ui/ProductForm";

export interface pageProps {
  params: {
    slug: string;
  };
}

export default async function page({ params }: pageProps) {
  const { slug } = params;
  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  //TODO: new
  if (!product && slug !== "new") {
    redirect("/admin/products");
  }

  const title = slug === "new" ? "Nuevo producto" : "Editar producto";

  return (
    <>
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}
