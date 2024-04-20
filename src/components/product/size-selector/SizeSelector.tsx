import { Size } from "@/interfaces";
import clsx from "clsx";
import { type ReactElement } from "react";

export interface SizeSelectorProps {
  selectedSize?: Size;
  availableSizes: Size[];
  onSizeClicked: (size: Size) => void;
}

export function SizeSelector({
  availableSizes,
  selectedSize,
  onSizeClicked,
}: SizeSelectorProps): ReactElement {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4 ">Tallas Disponibles</h3>
      <div className="flex">
        {availableSizes.map((size) => (
          <button
            onClick={() => onSizeClicked(size)}
            key={size}
            className={clsx("mx-2 hover:underline text-lg", {
              underline: size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
