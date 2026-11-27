import { getRestaurantMenu } from "@/lib/api/restaurants";
import { getCartTotal, getPricedLines } from "@/utils/cart";
import type { CreateOrderInput, Order } from "@/types";

export const ORDERS_STORAGE_KEY = "dvibe-orders";

export class OrderError extends Error {
  constructor(
    public code: "restaurant-not-found" | "empty-order" | "item-unavailable",
  ) {
    super(code);
  }
}

function readOrders(): Order[] {
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];

    return Array.isArray(parsed) ? (parsed as Order[]) : [];
  } catch {
    return [];
  }
}

function writeOrders(orders: Order[]): void {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const existing = readOrders().find(
    (order) => order.idempotencyKey === input.idempotencyKey,
  );

  if (existing) return existing;

  const menu = await getRestaurantMenu(input.restaurantId);

  if (!menu) throw new OrderError("restaurant-not-found");
  if (input.lines.length === 0) throw new OrderError("empty-order");

  const priced = getPricedLines(input.lines, menu.categories);

  if (
    priced.length !== input.lines.length ||
    priced.some((line) => !line.item.isAvailable)
  ) {
    throw new OrderError("item-unavailable");
  }

  const orders = readOrders();

  const order: Order = {
    id: crypto.randomUUID(),
    orderNumber: `DV-${String(orders.length + 1).padStart(4, "0")}`,
    publicToken: crypto.randomUUID(),
    restaurantId: input.restaurantId,
    customerName: input.customerName.trim(),
    customerPhone: input.customerPhone.trim(),
    fulfillmentType: "pickup",
    orderNote: input.orderNote.trim(),
    lines: priced.map(({ item, quantity, note }) => ({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity,
      note,
    })),
    total: getCartTotal(priced),
    status: "pending",
    createdAt: new Date().toISOString(),
    idempotencyKey: input.idempotencyKey,
  };

  writeOrders([...orders, order]);

  return order;
}

export async function getOrderByToken(
  publicToken: string,
): Promise<Order | undefined> {
  return readOrders().find((order) => order.publicToken === publicToken);
}
