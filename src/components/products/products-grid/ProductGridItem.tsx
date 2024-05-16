"use client";
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState, type ReactElement } from "react";

export interface ProductGridItemProps {
  product: Product;
}

export function ProductGridItem({
  product,
}: ProductGridItemProps): ReactElement {
  const [displayImage, setDisplayImage] = useState<string>(product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in ">
      <Link href={`/product/${product.slug}`}>
        <ProductImage
          src={product.images[0]}
          alt={product.title}
          className="w-full object-cover rounded"
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
          displayImage={displayImage}
        />
      </Link>
      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-700" href={`/product/${product.slug}`}>
          {product.title}{" "}
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
}
