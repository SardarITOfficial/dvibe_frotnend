import { initialCartState } from "@/state/redux/slices/cartSlice";
import type { CartState } from "@/types";

export const CART_STORAGE_KEY = "dvibe-cart";

function isCartState(value: unknown): value is CartState {
  if (typeof value !== "object" || value === null) return false;

  const { restaurantId, lines, orderNote } = value as Record<string, unknown>;

  return (
    (restaurantId === null || typeof restaurantId === "string") &&
    typeof orderNote === "string" &&
    Array.isArray(lines) &&
    lines.every(
      (line) =>
        typeof line?.menuItemId === "string" &&
        typeof line?.quantity === "number" &&
        typeof line?.note === "string",
    )
  );
}

export function loadCart(): CartState {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : null;

    return isCartState(parsed) ? parsed : initialCartState;
  } catch {
    return initialCartState;
  }
}

export function saveCart(cart: CartState): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Storage can be full or blocked (private mode); the cart stays in memory.
  }
}
