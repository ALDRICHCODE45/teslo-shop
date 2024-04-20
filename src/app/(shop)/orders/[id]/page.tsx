import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { type ReactElement } from "react";
import { IoCardOutline } from "react-icons/io5";

export interface Props {
  params: {
    id: string;
  };
}

const productsIncart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function OrderIdPage({ params }: Props): ReactElement {
  const { id } = params;

  //todo:Verificar

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]  ">
        <Title title={`id de la orden ${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": false,
                  "bg-green-700": true,
                }
              )}
            >
              <IoCardOutline size={25} />
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">Orden Pagada</span>
            </div>
            {/* Items */}
            {productsIncart.map((product) => (
              <div className="flex mb-5" key={product.slug}>
                <Image
                  style={{ width: "120px", height: "120px" }}
                  src={`/products/${product.images[0]}`}
                  alt=""
                  width={100}
                  height={100}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p>Subtotal: {product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Aldrich Flores Vazquez</p>
              <p>Av. Siempre viva 130</p>
              <p>Zumpango Estado de Mexico</p>
              <p>Mz.26</p>
              <p>Lt.11</p>
            </div>
            <div className="w-full h-0.5 rounded bg-gray-200  mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2 ">
              <span className="">No. Productos</span>
              <span className="text-right">3 articulos</span>

              <span className="">Subtotal</span>
              <span className="text-right">$100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx(
                  "flex items-center rounded py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": true,
                    "bg-green-700": false,
                  }
                )}
              >
                <IoCardOutline size={25} />
                <span className="mx-2">Pendiente de pago</span>
                {/* <span className="mx-2">Orden Pagada</span> */}
              </div>

              <Link
                className="flex btn-primary justify-center"
                href="/orders/2352321"
              >
                Colocar Orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
