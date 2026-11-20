import { describe, it, expect } from "vitest";

import { searchSchema } from "@/validations";

describe("searchSchema", () => {
  it("should reject an empty form", () => {
    expect(searchSchema.isValidSync({ location: "", q: "" })).toBe(false);
  });

  it("should reject whitespace-only search text", () => {
    expect(searchSchema.isValidSync({ location: "", q: "   " })).toBe(false);
  });

  it("should accept a location only", () => {
    expect(searchSchema.isValidSync({ location: "mindelo", q: "" })).toBe(
      true,
    );
  });

  it("should accept search text only", () => {
    expect(searchSchema.isValidSync({ location: "", q: "pizza" })).toBe(true);
  });
});