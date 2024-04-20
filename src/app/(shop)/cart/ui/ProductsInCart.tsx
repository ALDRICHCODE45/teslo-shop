"use client";
import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store/cart-store/cart-store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactElement } from "react";

export interface ProductsInCartProps {}

export function ProductsInCart(props: ProductsInCartProps): ReactElement {
  const productsIncart = useCartStore((state) => state.cart);
  const removeProductInCart = useCartStore((state) => state.removeProduct);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  });

  if (!loaded) {
    return <p>loading...</p>;
  }
  return (
    <>
      {productsIncart.map((product) => (
        <div className="flex mb-5" key={`${product.slug}-${product.size}`}>
          <Image
            style={{ width: "120px", height: "120px" }}
            src={`/products/${product.image}`}
            alt=""
            width={100}
            height={100}
            className="mr-5 rounded"
          />
          <div>
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              {product.size} - {product.title}
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityClick={(value) => updateProductQuantity(product, value)}
            />
            <button
              className="underline mt-3"
              onClick={() => removeProductInCart(product)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
