import { describe, it, expect } from "vitest";

import { deepMerge } from "@/lib/i18n/messages";

describe("deepMerge", () => {
  it("should keep base keys missing from the override", () => {
    const merged = deepMerge(
      { Cart: { title: "Cart", empty: "Empty" } },
      { Cart: { title: "Panier" } },
    );

    expect(merged).toEqual({ Cart: { title: "Panier", empty: "Empty" } });
  });

  it("should not mutate the base object", () => {
    const base = { Cart: { title: "Cart" } };

    deepMerge(base, { Cart: { title: "Panier" } });

    expect(base.Cart.title).toBe("Cart");
  });
});