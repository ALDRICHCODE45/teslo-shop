"use client";
import { titleFont } from "@/config/fonts";
import { useCartStore } from "@/store/cart-store/cart-store";
import { useUIStore } from "@/store/ui/ui-store";
import Link from "next/link";
import { useEffect, useState, type ReactElement } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export interface TopMenuProps {}

export function TopMenu(props: TopMenuProps): ReactElement {
  const onOpenMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsIncart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold `}>
            Teslo
          </span>
          <span>| Shop</span>
        </Link>
      </div>
      <div className="hidden sm:block">
        <Link
          href="/gender/men"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Hombres
        </Link>
        <Link
          href="/gender/women"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Mujeres
        </Link>
        <Link
          href="/gender/kid"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Ninos
        </Link>
      </div>
      <div className="flex items-center ">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link
          href={totalItemsIncart === 0 && loaded ? "/empty" : "/cart"}
          className="mx-2"
        >
          <div className="relative">
            {loaded && totalItemsIncart > 0 && (
              <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                {totalItemsIncart}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          onClick={onOpenMenu}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 "
        >
          Menu
        </button>
      </div>
    </nav>
  );
}
