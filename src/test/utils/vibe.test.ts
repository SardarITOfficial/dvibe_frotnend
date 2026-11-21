import { describe, it, expect } from "vitest";

import { VIBE_EVENTS } from "@/mocks/vibeEvents";
import {
  buildVibeHref,
  filterVibeEvents,
  getVibeCountdown,
  getVibeDateRange,
  getVibeEventById,
  getVibeEventStart,
  getVibeToday,
  parseVibeFilter,
  parseVibeTimeFilter,
} from "@/utils/vibe";

const SATURDAY = "2026-11-21";

const getIds = (events: typeof VIBE_EVENTS) => events.map(({ id }) => id);

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

describe("parseVibeTimeFilter", () => {
  it("should return a valid time filter", () => {
    expect(parseVibeTimeFilter("weekend")).toBe("weekend");
  });

  it("should fall back to upcoming for missing or unknown values", () => {
    expect(parseVibeTimeFilter(undefined)).toBe("upcoming");
    expect(parseVibeTimeFilter("unknown")).toBe("upcoming");
  });
});

describe("getVibeToday", () => {
  it("should use the Cape Verde calendar day", () => {
    expect(getVibeToday(new Date("2026-11-22T00:30:00Z"))).toBe(SATURDAY);
  });
});

describe("getVibeDateRange", () => {
  it("should return today and tomorrow", () => {
    expect(getVibeDateRange("today", SATURDAY)).toEqual({
      from: "2026-11-21",
      to: "2026-11-21",
    });
    expect(getVibeDateRange("tomorrow", SATURDAY)).toEqual({
      from: "2026-11-22",
      to: "2026-11-22",
    });
  });

  it("should return the current weekend when today is Saturday", () => {
    expect(getVibeDateRange("weekend", SATURDAY)).toEqual({
      from: "2026-11-21",
      to: "2026-11-22",
    });
  });

  it("should return the next weekend on a weekday", () => {
    expect(getVibeDateRange("weekend", "2026-11-25")).toEqual({
      from: "2026-11-28",
      to: "2026-11-29",
    });
  });

  it("should return only today on Sunday", () => {
    expect(getVibeDateRange("weekend", "2026-11-22")).toEqual({
      from: "2026-11-22",
      to: "2026-11-22",
    });
  });

  it("should return seven days for this week and an open end for upcoming", () => {
    expect(getVibeDateRange("week", SATURDAY)).toEqual({
      from: "2026-11-21",
      to: "2026-11-27",
    });
    expect(getVibeDateRange("upcoming", SATURDAY)).toEqual({
      from: "2026-11-21",
      to: null,
    });
  });
});

describe("filterVibeEvents", () => {
  it("should return every upcoming event sorted by date", () => {
    const result = filterVibeEvents(VIBE_EVENTS, {
      category: "all",
      time: "upcoming",
      today: SATURDAY,
    });

    expect(getIds(result)).toEqual([
      "morna-night",
      "acoustic-sessions",
      "street-market",
      "rooftop-party",
      "beach-festival",
      "dj-night",
    ]);
  });

  it("should filter by day", () => {
    const result = filterVibeEvents(VIBE_EVENTS, {
      category: "all",
      time: "today",
      today: SATURDAY,
    });

    expect(getIds(result)).toEqual(["morna-night"]);
  });

  it("should filter by weekend and week", () => {
    expect(
      getIds(
        filterVibeEvents(VIBE_EVENTS, {
          category: "all",
          time: "weekend",
          today: SATURDAY,
        }),
      ),
    ).toEqual(["morna-night", "acoustic-sessions"]);

    expect(
      getIds(
        filterVibeEvents(VIBE_EVENTS, {
          category: "all",
          time: "week",
          today: SATURDAY,
        }),
      ),
    ).toEqual([
      "morna-night",
      "acoustic-sessions",
      "street-market",
      "rooftop-party",
    ]);
  });

  it("should combine category and time", () => {
    const result = filterVibeEvents(VIBE_EVENTS, {
      category: "nightlife",
      time: "week",
      today: SATURDAY,
    });

    expect(getIds(result)).toEqual(["rooftop-party"]);
  });

  it("should exclude events before today", () => {
    const result = filterVibeEvents(VIBE_EVENTS, {
      category: "all",
      time: "upcoming",
      today: "2026-12-01",
    });

    expect(getIds(result)).toEqual(["dj-night"]);
  });
  it("should include multi-day events that are still running", () => {
    const festival = {
      ...VIBE_EVENTS[0],
      id: "festival",
      date: "2026-11-19",
      endDate: "2026-11-23",
    };

    const result = filterVibeEvents([festival], {
      category: "all",
      time: "today",
      today: SATURDAY,
    });

    expect(getIds(result)).toEqual(["festival"]);
  });
});

describe("buildVibeHref", () => {
  it("should omit default values", () => {
    expect(buildVibeHref({ category: "all", time: "upcoming" })).toBe("/vibe");
  });

  it("should include only non-default values", () => {
    expect(buildVibeHref({ category: "events", time: "upcoming" })).toBe(
      "/vibe?category=events",
    );
    expect(buildVibeHref({ category: "all", time: "weekend" })).toBe(
      "/vibe?when=weekend",
    );
    expect(buildVibeHref({ category: "events", time: "today" })).toBe(
      "/vibe?category=events&when=today",
    );
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

describe("getVibeEventStart", () => {
  it("should convert the Cape Verde start time to a timestamp", () => {
    expect(getVibeEventStart("2026-11-21", "21:00")).toBe(
      Date.UTC(2026, 10, 21, 22, 0, 0),
    );
  });
});

describe("getVibeCountdown", () => {
  const start = getVibeEventStart("2026-11-21", "21:00");

  it("should split the remaining time into units", () => {
    const now = start - ((86400 + 2 * 3600 + 3 * 60 + 4) * 1000);

    expect(getVibeCountdown(start, now)).toEqual({
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4,
    });
  });

  it("should return null once the event has started", () => {
    expect(getVibeCountdown(start, start)).toBeNull();
    expect(getVibeCountdown(start, start + 1000)).toBeNull();
  });
});
