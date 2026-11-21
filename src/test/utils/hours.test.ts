import { describe, expect, it } from "vitest";

import { getCapeVerdeMinutes, isOpenNow } from "@/utils/hours";

const at = (utc: string) => new Date(`2026-11-21T${utc}:00Z`);

describe("getCapeVerdeMinutes", () => {
  it("converts UTC to Cape Verde time", () => {
    expect(getCapeVerdeMinutes(at("12:00"))).toBe(11 * 60);
    expect(getCapeVerdeMinutes(at("00:30"))).toBe(23 * 60 + 30);
  });
});

describe("isOpenNow", () => {
  it("is open inside a same-day range", () => {
    expect(isOpenNow("07:00-11:00", at("11:00"))).toBe(true);
  });

  it("is closed at the closing time and after", () => {
    expect(isOpenNow("07:00-11:00", at("12:00"))).toBe(false);
    expect(isOpenNow("07:00-11:00", at("20:00"))).toBe(false);
  });

  it("is open before midnight in a past-midnight range", () => {
    expect(isOpenNow("10:00-04:00", at("12:00"))).toBe(true);
  });

  it("is open after midnight in a past-midnight range", () => {
    expect(isOpenNow("10:00-04:00", at("04:00"))).toBe(true);
  });

  it("is closed between closing and opening in a past-midnight range", () => {
    expect(isOpenNow("10:00-04:00", at("06:00"))).toBe(false);
  });

  it("is closed when the hours cannot be read", () => {
    expect(isOpenNow("always", at("12:00"))).toBe(false);
  });
});