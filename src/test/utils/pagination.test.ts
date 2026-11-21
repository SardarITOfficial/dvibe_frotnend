import { describe, expect, it } from "vitest";

import { getPageItems, paginate, parsePage } from "@/utils/pagination";

const items = Array.from({ length: 10 }, (_, index) => index + 1);

describe("paginate", () => {
  it("returns the requested page", () => {
    expect(paginate(items, 2, 4)).toEqual({
      items: [5, 6, 7, 8],
      currentPage: 2,
      totalPages: 3,
    });
  });

  it("returns a shorter last page", () => {
    expect(paginate(items, 3, 4).items).toEqual([9, 10]);
  });

  it("clamps pages that are out of range", () => {
    expect(paginate(items, 99, 4).currentPage).toBe(3);
    expect(paginate(items, 0, 4).currentPage).toBe(1);
  });

  it("keeps one page when there are no items", () => {
    expect(paginate([], 1, 4)).toEqual({
      items: [],
      currentPage: 1,
      totalPages: 1,
    });
  });
});

describe("parsePage", () => {
  it("parses valid pages", () => {
    expect(parsePage("3")).toBe(3);
    expect(parsePage(["2", "5"])).toBe(2);
  });

  it("falls back to the first page for invalid values", () => {
    expect(parsePage(undefined)).toBe(1);
    expect(parsePage("abc")).toBe(1);
    expect(parsePage("0")).toBe(1);
    expect(parsePage("-2")).toBe(1);
  });
});

describe("getPageItems", () => {
  it("lists every page when there are few", () => {
    expect(getPageItems(1, 3)).toEqual([1, 2, 3]);
  });

  it("adds an ellipsis at the end", () => {
    expect(getPageItems(1, 10)).toEqual([1, 2, "ellipsis", 10]);
  });

  it("adds ellipses on both sides in the middle", () => {
    expect(getPageItems(5, 10)).toEqual([1, "ellipsis", 4, 5, 6, "ellipsis", 10]);
  });

  it("fills a gap of a single page instead of using an ellipsis", () => {
    expect(getPageItems(4, 10)).toEqual([1, 2, 3, 4, 5, "ellipsis", 10]);
  });

  it("adds an ellipsis at the start", () => {
    expect(getPageItems(10, 10)).toEqual([1, "ellipsis", 9, 10]);
  });
});