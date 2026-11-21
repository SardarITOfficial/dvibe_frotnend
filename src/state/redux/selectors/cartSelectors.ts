import type { CartState } from "@/types";

type CartRoot = { cart: CartState };

export const selectCart = (state: CartRoot) => state.cart;

export const selectCartItemCount = (state: CartRoot) =>
  state.cart.lines.reduce((total, line) => total + line.quantity, 0);

export const selectCartConflict = (state: CartRoot, restaurantId: string) =>
  state.cart.restaurantId !== null && state.cart.restaurantId !== restaurantId;