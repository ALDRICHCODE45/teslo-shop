"use client";
import { useCartStore } from "@/store/cart-store/cart-store";
import { useEffect, useState, type ReactElement } from "react";

export interface OrderSummaryProps {}

export function OrderSummary({}: OrderSummaryProps): ReactElement {
  const [loaded, setLoaded] = useState(false);

  const { itemsIncart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, [loaded, setLoaded]);

  if (!loaded) return <p>loading...</p>;

  return (
    <>
      <div className="grid grid-cols-2 ">
        <span className="">No. Productos</span>
        <span className="text-right">
          {itemsIncart === 1 ? "1 articulo" : `${itemsIncart} articulos`}
        </span>

        <span className="">Subtotal</span>
        <span className="text-right">{subTotal}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{tax}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">{total}</span>
      </div>
    </>
  );
}
