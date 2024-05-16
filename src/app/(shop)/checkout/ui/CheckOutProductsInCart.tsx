"use client";
import { useCartStore } from "@/store/cart-store/cart-store";
import Image from "next/image";
import { useEffect, useState, type ReactElement } from "react";

export interface ProductsInCartProps {}

export function CheckOutProductsInCart({}: ProductsInCartProps): ReactElement {
  const productsIncart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [loaded, setLoaded]);

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
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>
            <p className="font-bold">${product.price * product.quantity}</p>
          </div>
        </div>
      ))}
    </>
  );
}
