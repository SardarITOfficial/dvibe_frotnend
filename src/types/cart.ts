export type CartLine = {
  menuItemId: string;
  quantity: number;
  note: string;
};

export type CartState = {
  restaurantId: string | null;
  lines: CartLine[];
  orderNote: string;
};