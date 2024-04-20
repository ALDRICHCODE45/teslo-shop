"use client";
import { type ReactElement } from "react";
import { IoAddCircleOutline, IoRemoveOutline } from "react-icons/io5";

export interface QuantitySelectorProps {
  quantity?: number;
  onQuantityClick: (value: number) => void;
}

export function QuantitySelector({
  quantity = 1,
  onQuantityClick,
}: QuantitySelectorProps): ReactElement {
  const onValueChanged = (value: number) => {
    if (quantity + value < 1) return;
    onQuantityClick(quantity + value);
  };

  return (
    <div className="flex">
      <button onClick={() => onValueChanged(-1)}>
        <IoRemoveOutline size={25} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
        {quantity}
      </span>
      <button onClick={() => onValueChanged(+1)}>
        <IoAddCircleOutline size={25} />
      </button>
    </div>
  );
}
