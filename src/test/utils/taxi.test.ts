import { describe, expect, it } from "vitest";

import { getTodayDateString } from "@/utils/taxi";

describe("getTodayDateString", () => {
  it("should format the local date as YYYY-MM-DD", () => {
    expect(getTodayDateString(new Date(2026, 10, 3))).toBe("2026-11-03");
  });
});