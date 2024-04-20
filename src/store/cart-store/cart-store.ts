import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cart: CartProduct[];
  addProductTocart: (product: CartProduct) => void;
  getTotalItems: () => number;
  updateProductQuantity: (product: CartProduct, newQuantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  getSummaryInformation: () => {
    tax: number;
    subTotal: number;
    total: number;
    itemsIncart: number;
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      getSummaryInformation() {
        const { cart } = get();
        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsIncart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          subTotal,
          tax,
          total,
          itemsIncart,
        };
      },
      addProductTocart: async (product: CartProduct) => {
        const { cart } = get();
        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }
        //2. Se que el producto existe por talla, tengo que incrementar
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: product.quantity };
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },
      updateProductQuantity(product: CartProduct, newQuantity: number) {
        const { cart } = get();
        const cartUpdated = cart.map((item) => {
          if (item.id === product.id && product.size === item.size) {
            return { ...item, quantity: newQuantity };
          }

          return item;
        });
        set({ cart: cartUpdated });
      },
      removeProduct(product: CartProduct) {
        const { cart } = get();
        const cartUpdated = cart.filter((item) => item.id !== product.id);
        set({ cart: cartUpdated });
      },
    }),
    { name: "shoppingCArt" }
  )
);
