import { describe, expect, it } from "vitest";

import { signupSchema } from "@/validations/signup.schema";

const valid = {
  name: "Ana",
  email: "ana@example.com",
  phone: "+238 991 00 00",
  password: "Password123!",
  confirmPassword: "Password123!",
};

describe("signupSchema", () => {
  it("accepts valid signup data", () => {
    expect(signupSchema.isValidSync(valid)).toBe(true);
  });

  it("rejects a missing name or an invalid phone", () => {
    expect(signupSchema.isValidSync({ ...valid, name: "" })).toBe(false);
    expect(signupSchema.isValidSync({ ...valid, phone: "abc" })).toBe(false);
  });

  it("rejects a confirmation that does not match", () => {
    expect(
      signupSchema.isValidSync({ ...valid, confirmPassword: "Other123!" }),
    ).toBe(false);
  });
});