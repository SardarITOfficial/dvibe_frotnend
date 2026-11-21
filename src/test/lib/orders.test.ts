import { beforeEach, describe, expect, it } from "vitest";

import { createOrder, getOrderByToken, OrderError } from "@/lib/api/orders";

const baseInput = {
  restaurantId: "pizzar",
  customerName: " Ana ",
  customerPhone: "+238 991 00 00",
  orderNote: "",
  lines: [{ menuItemId: "margherita", quantity: 2, note: "" }],
  idempotencyKey: "key-1",
};

describe("orders service", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("creates a pending order with a server-side total", async () => {
    const order = await createOrder(baseInput);

    expect(order.status).toBe("pending");
    expect(order.total).toBe(1800);
    expect(order.customerName).toBe("Ana");
    expect(order.lines[0].name).toBe("Margherita");
  });

  it("returns the same order for the same idempotency key", async () => {
    const first = await createOrder(baseInput);
    const second = await createOrder(baseInput);

    expect(second.id).toBe(first.id);
  });

  it("finds an order by its public token", async () => {
    const order = await createOrder(baseInput);

    expect((await getOrderByToken(order.publicToken))?.id).toBe(order.id);
    expect(await getOrderByToken("unknown")).toBe(undefined);
  });

  it("rejects an unknown restaurant, an empty order and unknown items", async () => {
    await expect(
      createOrder({ ...baseInput, restaurantId: "nope", idempotencyKey: "a" }),
    ).rejects.toThrow(OrderError);
    await expect(
      createOrder({ ...baseInput, lines: [], idempotencyKey: "b" }),
    ).rejects.toThrow(OrderError);
    await expect(
      createOrder({
        ...baseInput,
        lines: [{ menuItemId: "ghost", quantity: 1, note: "" }],
        idempotencyKey: "c",
      }),
    ).rejects.toThrow(OrderError);
  });
});