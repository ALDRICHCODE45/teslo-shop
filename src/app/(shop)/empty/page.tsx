import Link from "next/link";
import { type ReactElement } from "react";
import { IoCartOutline } from "react-icons/io5";

export interface pageProps {}

export default function Empty({}: pageProps): ReactElement {
  return (
    <div className="flex justify-center items-center h-[800px]">
      <IoCartOutline size={80} className="mx-5" />
      <div className="flex flex-col items-center ">
        <h1 className="text-xl font-semibold">Tu carrito esta vacio</h1>
        <Link href="/" className="text-blue-500 mt-2 text-4xl">
          Regresar
        </Link>
      </div>
    </div>
  );
}
