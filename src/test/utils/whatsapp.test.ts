import { describe, it, expect } from "vitest";

import { buildWhatsAppHref } from "@/utils/whatsapp";

describe("buildWhatsAppHref", () => {
  it("should keep only the digits of the phone number", () => {
    expect(buildWhatsAppHref("+238 999 00 01", "Hi")).toBe(
      "https://wa.me/2389990001?text=Hi",
    );
  });

  it("should encode the message", () => {
    expect(buildWhatsAppHref("2389990001", "Hi there & welcome")).toBe(
      "https://wa.me/2389990001?text=Hi%20there%20%26%20welcome",
    );
  });
});