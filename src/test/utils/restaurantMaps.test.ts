import { describe, it, expect } from "vitest";

import { buildMapsHref } from "@/utils/restaurant";

describe("buildMapsHref", () => {
  it("should use the restaurant map link when provided", () => {
    const mapUrl = "https://maps.app.goo.gl/abc123";

    expect(buildMapsHref({ name: "PIZZAR", location: "Mindelo", mapUrl })).toBe(
      mapUrl,
    );
  });

  it("should fall back to a Google Maps search on name and location", () => {
    expect(
      buildMapsHref({ name: "Pão Quente", location: "Rua de Lisboa, Mindelo" }),
    ).toBe(
      "https://www.google.com/maps/search/?api=1&query=P%C3%A3o%20Quente%2C%20Rua%20de%20Lisboa%2C%20Mindelo",
    );
  });
});