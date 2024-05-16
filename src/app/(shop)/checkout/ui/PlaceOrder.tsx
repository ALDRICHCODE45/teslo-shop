"use client";
import { placeOrder } from "@/actions";
import { useAddressState, useCartStore } from "@/store";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function PlaceOrder() {
  const [loaded, setLoaded] = useState<boolean>();
  const [isplaceOrder, setIsPlaceOrder] = useState<boolean>(false);
  const [placeOrderError, setPlaceOrderError] = useState<string>();
  const router = useRouter();

  const address = useAddressState((state) => state.address);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const { itemsIncart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  const onPlaceOrder = async () => {
    setIsPlaceOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    //Server Action
    const resp = await placeOrder(productsToOrder, address);
    if (!resp.ok) {
      setIsPlaceOrder(false);
      setPlaceOrderError(resp.message);
      return;
    }
    //todo salio bien
    //limpiar el carrido y redireccionar a la persona
    clearCart();
    router.replace("/orders/" + resp.order?.id);
  };

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
      </div>
      <div className="w-full h-0.5 rounded bg-gray-200  mb-10" />

      <h2 className="text-2xl mb-2">Resumen de orden</h2>

      <div className="grid grid-cols-2 ">
        <span className="">No. Productos</span>
        <span className="text-right">
          {itemsIncart === 1 ? "1 articulo" : `${itemsIncart} articulos`}
        </span>

        <span className="">Subtotal</span>
        <span className="text-right">${subTotal}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">${tax}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">${total}</span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          <span className="text-xs">
            Al hacer click en &quotColocar Orden&quot, aceptas nuestros{" "}
            <a href="#" className="underline">
              Terminos y condiciones de uso
            </a>
            y
            <a href="#" className="underline">
              politica de privacidad
            </a>
          </span>
        </p>

        <p className="text-red-500">{placeOrderError}</p>

        <button
          disabled={isplaceOrder}
          onClick={onPlaceOrder}
          //href="/orders/2352321"
          className={clsx({
            "btn-primary": !isplaceOrder,
            "btn-disabled": isplaceOrder,
          })}
        >
          Colocar Orden
        </button>
      </div>
    </div>
  );
}
