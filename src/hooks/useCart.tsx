import { useDispatch, useSelector } from "react-redux";

import {
  addItem,
  clearCart,
  setQuantity,
} from "@/state/redux/slices/cartSlice";
import type { RootState } from "@/state/redux/store";

export function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  return {
    cart,
    getQuantity: (menuItemId: string) =>
      cart.lines.find((line) => line.menuItemId === menuItemId)?.quantity ?? 0,
    isOtherRestaurantCart: (restaurantId: string) =>
      cart.restaurantId !== null && cart.restaurantId !== restaurantId,
    add: (restaurantId: string, menuItemId: string) =>
      dispatch(addItem({ restaurantId, menuItemId })),
    updateQuantity: (menuItemId: string, quantity: number) =>
      dispatch(setQuantity({ menuItemId, quantity })),
    clear: () => dispatch(clearCart()),
  };
}