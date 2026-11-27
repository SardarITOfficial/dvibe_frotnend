import { describe, it, expect } from "vitest";

import { getLocaleButtonLabel, getLocaleName } from "@/lib/i18n/locales";

describe("locales", () => {
  it("should use the Kriolu override", () => {
    expect(getLocaleName("kea")).toBe("Kriolu");
    expect(getLocaleButtonLabel("kea")).toBe("KR");
  });

  it("should derive other names and labels from the code", () => {
    expect(getLocaleName("en")).toBe("English");
    expect(getLocaleButtonLabel("fr")).toBe("FR");
  });
});