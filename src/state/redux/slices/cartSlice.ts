import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { CartState } from "@/types";

export const MAX_LINE_QUANTITY = 20;

export const initialCartState: CartState = {
  restaurantId: null,
  lines: [],
  orderNote: "",
};

type AddItemPayload = {
  restaurantId: string;
  menuItemId: string;
  quantity?: number;
  note?: string;
};

const clampQuantity = (quantity: number) =>
  Math.min(Math.max(quantity, 0), MAX_LINE_QUANTITY);

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    hydrateCart: (_state, action: PayloadAction<CartState>) => action.payload,
    addItem: (state, action: PayloadAction<AddItemPayload>) => {
      const { restaurantId, menuItemId, quantity = 1, note = "" } = action.payload;

      if (state.restaurantId && state.restaurantId !== restaurantId) return;

      state.restaurantId = restaurantId;

      const line = state.lines.find((item) => item.menuItemId === menuItemId);

      if (line) {
        line.quantity = clampQuantity(line.quantity + quantity);
        if (note) line.note = note;
        return;
      }

      state.lines.push({ menuItemId, quantity: clampQuantity(quantity), note });
    },
    setQuantity: (
      state,
      action: PayloadAction<{ menuItemId: string; quantity: number }>,
    ) => {
      const { menuItemId, quantity } = action.payload;
      const line = state.lines.find((item) => item.menuItemId === menuItemId);

      if (!line) return;

      line.quantity = clampQuantity(quantity);
      state.lines = state.lines.filter((item) => item.quantity > 0);

      if (state.lines.length === 0) state.restaurantId = null;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.lines = state.lines.filter(
        (item) => item.menuItemId !== action.payload,
      );

      if (state.lines.length === 0) state.restaurantId = null;
    },
    setLineNote: (
      state,
      action: PayloadAction<{ menuItemId: string; note: string }>,
    ) => {
      const line = state.lines.find(
        (item) => item.menuItemId === action.payload.menuItemId,
      );

      if (line) line.note = action.payload.note;
    },
    setOrderNote: (state, action: PayloadAction<string>) => {
      state.orderNote = action.payload;
    },
    startNewCart: (_state, action: PayloadAction<AddItemPayload>) => {
      const { restaurantId, menuItemId, quantity = 1, note = "" } = action.payload;

      return {
        restaurantId,
        lines: [{ menuItemId, quantity: clampQuantity(quantity), note }],
        orderNote: "",
      };
    },
    clearCart: () => initialCartState,
  },
});

export const {
  hydrateCart,
  addItem,
  setQuantity,
  removeItem,
  setLineNote,
  setOrderNote,
  startNewCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;