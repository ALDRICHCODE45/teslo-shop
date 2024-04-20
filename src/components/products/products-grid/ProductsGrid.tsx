import { Product } from "@/interfaces";
import { ProductGridItem } from "./ProductGridItem";

export interface ProductsGridProps {
  products: Product[];
}

export const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {products.map((product) => (
        <ProductGridItem product={product} key={product.slug} />
      ))}
    </div>
  );
};
