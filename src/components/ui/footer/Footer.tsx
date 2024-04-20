import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { type ReactElement } from "react";

export function Footer(): ReactElement {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold`}>
          Teslo
        </span>
        <span>Shop</span>
        <span>© {new Date().getFullYear()}</span>
      </Link>
      <Link href="/" className="mx-3  ">
        Privacidad & Legal
      </Link>
    </div>
  );
}