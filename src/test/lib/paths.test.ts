import { describe, it, expect } from "vitest";

import { getLanguageAlternates, getLocalizedPath } from "@/lib/i18n/paths";
import { routing } from "@/lib/i18n/routing";

describe("getLocalizedPath", () => {
  it("should return the locale root for the home path", () => {
    expect(getLocalizedPath("pt", "/")).toBe("/pt");
  });

  it("should prefix nested paths with the locale", () => {
    expect(getLocalizedPath("en", "/explore")).toBe("/en/explore");
  });
});

describe("getLanguageAlternates", () => {
  it("should include every configured locale and x-default", () => {
    const alternates = getLanguageAlternates("/explore");

    routing.locales.forEach((locale) => {
      expect(alternates[locale]).toBe(`/${locale}/explore`);
    });
    expect(alternates["x-default"]).toBe(`/${routing.defaultLocale}/explore`);
  });
});