import { describe, it, expect } from "vitest";

import { VIBE_EVENTS } from "@/mocks/vibeEvents";
import { filterVibeEvents, parseVibeFilter } from "@/utils/vibe";
import {
  getVibeEventById,
} from "@/utils/vibe";
describe("parseVibeFilter", () => {
  it("should return a valid category", () => {
    expect(parseVibeFilter("events")).toBe("events");
  });

  it("should fall back to all for missing, unknown or repeated values", () => {
    expect(parseVibeFilter(undefined)).toBe("all");
    expect(parseVibeFilter("unknown")).toBe("all");
    expect(parseVibeFilter(["events", "nightlife"])).toBe("all");
  });
});

describe("filterVibeEvents", () => {
  it("should return every event for all", () => {
    expect(filterVibeEvents(VIBE_EVENTS, "all")).toEqual(VIBE_EVENTS);
  });

  it("should return only events of the selected category", () => {
    const result = filterVibeEvents(VIBE_EVENTS, "nightlife");

    expect(result.length).toBeGreaterThan(0);
    expect(result.every(({ category }) => category === "nightlife")).toBe(true);
  });
});



describe("getVibeEventById", () => {
  it("should return the matching event", () => {
    expect(getVibeEventById(VIBE_EVENTS, "dj-night")?.id).toBe("dj-night");
  });

  it("should return undefined for an unknown id", () => {
    expect(getVibeEventById(VIBE_EVENTS, "missing")).toBeUndefined();
  });
});