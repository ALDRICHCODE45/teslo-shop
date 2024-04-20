export const revalidate = 604800;

import { getProductBySlug } from "@/actions";
import { ProductSlideShowMobile } from "@/components";
import { ProductSlideShow } from "@/components";
import { StockLabel } from "@/components/product/stock-label/StockLabel";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

export interface pageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: pageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      //images: ['/some-specific-page-image.jpg', ...previousImages],
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function Product({ params }: pageProps) {
  const { slug } = params;
  //const product = initialData.products.find((product) => product.slug === slug);
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex justify-center mt-5 mb-20">
      <div className="max-w-5xl w-full px-4">
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-4 ">
          {/*SlideShow Mobile*/}
          {/* <ProductSlideShowMobile images={product.images} title={product.title} /> */}
          {/*SlideShow*/}
          <div className="col-span-2 md:col-span-2">
            <ProductSlideShowMobile
              images={product.images}
              title={product.title}
              clasName="block md:hidden"
            />
            <ProductSlideShow
              images={product.images}
              title="producto"
              clasName="hidden md:block"
            />
          </div>

          {/*Detalles del producto*/}
          <div className="col-span-2">
            <StockLabel slug={slug} />
            <h1
              className={`${titleFont.className} antialiased font-bold text-xl`}
            >
              {product.title}
            </h1>
            <p className="text-lg mb-5 ">{product.price}</p>
            {/*Selector de tallas*/}
            <AddToCart product={product} />
            {/*Description*/}
            <h3 className="font-bold text-sm">Description</h3>
            <p className="font-light">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
