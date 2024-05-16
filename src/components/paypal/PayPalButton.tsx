"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";

import { type ReactElement } from "react";
import { paypalCheckPayment, setTransactionId } from "@/actions";

export interface PayPalButtonProps {
  orderId: string;
  amount: number;
}

export function PayPalButton({
  amount,
  orderId,
}: PayPalButtonProps): ReactElement {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className="animate-pulse mb-11">
        <div className="h-12 bg-gray-300 rounded"></div>
        <div className="h-12 bg-gray-300 rounded mt-2"></div>
      </div>
    );
  }

  const createOrder = async (
    _data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: `${roundedAmount}`,
          },
        },
      ],
    });

    const { msg, ok } = await setTransactionId(orderId, transactionId);
    if (!ok) {
      throw new Error(msg);
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    if (!details) return;
    await paypalCheckPayment(details.id);
  };

  return (
    <div className="relative z-0">
      <PayPalButtons onApprove={onApprove} createOrder={createOrder} />
    </div>
  );
}
