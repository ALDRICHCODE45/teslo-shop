"use client";
import { QuantitySelector, SizeSelector } from "@/components";
import { useState, type ReactElement } from "react";
import { CartProduct, Product, Size } from "@/interfaces";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart-store/cart-store";

export interface AddToCartProps {
  product: Product;
}

export function AddToCart({ product }: AddToCartProps): ReactElement {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const addProductTocart = useCartStore((state) => state.addProductTocart);

  const onSizeClicked = (size: Size) => {
    setSize(size);
  };

  const onAddToCart = () => {
    if (!size) {
      toast.error("seleccione una talla");
      return;
    }

    const cartProduct: CartProduct = {
      id: product.id,
      image: product.images[0],
      price: product.price,
      quantity: quantity,
      size: size,
      slug: product.slug,
      title: product.title,
    };
    addProductTocart(cartProduct);
    toast.success("product added to cart");
    setSize(undefined);
    setQuantity(1);
  };

  return (
    <>
      <SizeSelector
        onSizeClicked={onSizeClicked}
        selectedSize={size}
        availableSizes={product.sizes}
      />

      {/*Selector de Cantidad*/}
      <QuantitySelector quantity={quantity} onQuantityClick={setQuantity} />

      {/*Boton*/}
      <button className="btn-primary my-5" onClick={onAddToCart}>
        Agregar al carrito
      </button>
    </>
  );
}
