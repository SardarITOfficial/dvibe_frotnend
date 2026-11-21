import { describe, expect, it } from "vitest";

import reducer, {
  addItem,
  clearCart,
  initialCartState,
  MAX_LINE_QUANTITY,
  removeItem,
  setQuantity,
  startNewCart,
} from "@/state/redux/slices/cartSlice";
import {
  selectCartConflict,
  selectCartItemCount,
} from "@/state/redux/selectors/cartSelectors";

const add = (restaurantId: string, menuItemId: string, quantity = 1) =>
  addItem({ restaurantId, menuItemId, quantity });

describe("cartSlice", () => {
  it("adds an item and sets the restaurant", () => {
    const state = reducer(initialCartState, add("pizzar", "margherita"));

    expect(state.restaurantId).toBe("pizzar");
    expect(state.lines).toEqual([
      { menuItemId: "margherita", quantity: 1, note: "" },
    ]);
  });

  it("increases quantity when the same item is added again", () => {
    let state = reducer(initialCartState, add("pizzar", "margherita"));
    state = reducer(state, add("pizzar", "margherita", 2));

    expect(state.lines).toHaveLength(1);
    expect(state.lines[0].quantity).toBe(3);
  });

  it("ignores items from a different restaurant", () => {
    const state = reducer(
      reducer(initialCartState, add("pizzar", "margherita")),
      add("monte-cara", "cachupa"),
    );

    expect(state.restaurantId).toBe("pizzar");
    expect(state.lines).toHaveLength(1);
  });

  it("caps the quantity of a line", () => {
    const state = reducer(initialCartState, add("pizzar", "margherita", 99));

    expect(state.lines[0].quantity).toBe(MAX_LINE_QUANTITY);
  });

  it("removes a line when quantity reaches zero and resets the restaurant", () => {
    let state = reducer(initialCartState, add("pizzar", "margherita"));
    state = reducer(state, setQuantity({ menuItemId: "margherita", quantity: 0 }));

    expect(state).toEqual(initialCartState);
  });

  it("removes an item", () => {
    let state = reducer(initialCartState, add("pizzar", "margherita"));
    state = reducer(state, add("pizzar", "quatro-formaggi"));
    state = reducer(state, removeItem("margherita"));

    expect(state.lines.map((line) => line.menuItemId)).toEqual([
      "quatro-formaggi",
    ]);
  });

  it("starts a new cart for another restaurant", () => {
    let state = reducer(initialCartState, add("pizzar", "margherita"));
    state = reducer(
      state,
      startNewCart({ restaurantId: "monte-cara", menuItemId: "cachupa" }),
    );

    expect(state.restaurantId).toBe("monte-cara");
    expect(state.lines).toHaveLength(1);
  });

  it("clears the cart", () => {
    const state = reducer(
      reducer(initialCartState, add("pizzar", "margherita")),
      clearCart(),
    );

    expect(state).toEqual(initialCartState);
  });

  it("selects the item count and detects restaurant conflicts", () => {
    let state = reducer(initialCartState, add("pizzar", "margherita", 2));
    state = reducer(state, add("pizzar", "quatro-formaggi"));

    expect(selectCartItemCount({ cart: state })).toBe(3);
    expect(selectCartConflict({ cart: state }, "monte-cara")).toBe(true);
    expect(selectCartConflict({ cart: state }, "pizzar")).toBe(false);
  });
});