import { describe, expect, it } from "vitest";

import { isOrderFieldValid, orderSchema } from "@/validations/order.schema";

const valid = { name: "Ana", phone: "+238 991 00 00", note: "" };

describe("orderSchema", () => {
  it("accepts a name and a phone number", () => {
    expect(orderSchema.isValidSync(valid)).toBe(true);
  });

  it("rejects a missing name or an invalid phone", () => {
    expect(orderSchema.isValidSync({ ...valid, name: "" })).toBe(false);
    expect(orderSchema.isValidSync({ ...valid, phone: "abc" })).toBe(false);
  });
});

describe("isOrderFieldValid", () => {
  it("validates each field on its own", () => {
    expect(isOrderFieldValid("name", valid)).toBe(true);
    expect(isOrderFieldValid("name", { ...valid, name: "" })).toBe(false);
    expect(isOrderFieldValid("phone", { ...valid, phone: "abc" })).toBe(false);
    expect(isOrderFieldValid("note", { ...valid, note: "x".repeat(301) })).toBe(
      false,
    );
  });
});
