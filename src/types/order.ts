export type FulfillmentType = "pickup";

export type OrderStatus =
  | "pending"
  | "accepted"
  | "preparing"
  | "ready"
  | "completed"
  | "rejected"
  | "cancelled";

export type OrderLine = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  note: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  publicToken: string;
  restaurantId: string;
  customerName: string;
  customerPhone: string;
  fulfillmentType: FulfillmentType;
  orderNote: string;
  lines: OrderLine[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  idempotencyKey: string;
};

export type CreateOrderInput = {
  restaurantId: string;
  customerName: string;
  customerPhone: string;
  orderNote: string;
  lines: { menuItemId: string; quantity: number; note: string }[];
  idempotencyKey: string;
};