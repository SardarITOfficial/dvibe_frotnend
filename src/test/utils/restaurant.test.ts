import { describe, expect, it } from "vitest";

import type { MenuCategory } from "@/mocks/restaurantMenus";
import { RESTAURANT_MENUS } from "@/mocks/restaurantMenus";
import { RESTAURANTS_CONFIG } from "@/mocks/restaurants";
import {
  buildRestaurantsHref,
  filterRestaurants,
  getCuisineIds,
  getFeaturedRestaurants,
  getInitials,
  getPopularRestaurants,
  getRestaurantById,
  getRestaurantMenu,
  getVisibleMenuCategories,
  hasActiveFilters,
  parseRestaurantFilters,
} from "@/utils/restaurant";

const { restaurants } = RESTAURANTS_CONFIG;
const AREAS = ["mindelo", "calhau"];
const NO_FILTERS = { q: "", area: "", cuisine: "" };

const search = (filters: Partial<typeof NO_FILTERS>) =>
  filterRestaurants(restaurants, RESTAURANT_MENUS, {
    ...NO_FILTERS,
    ...filters,
  }).map((restaurant) => restaurant.id);

describe("restaurant utils", () => {
  it("finds a restaurant by id", () => {
    expect(getRestaurantById(restaurants, "pizzar")?.name).toBe("PIZZAR");
  });

  it("returns undefined for an unknown restaurant", () => {
    expect(getRestaurantById(restaurants, "nope")).toBe(undefined);
  });

  it("finds the menu of a restaurant", () => {
    expect(getRestaurantMenu(RESTAURANT_MENUS, "pizzar")?.restaurantId).toBe(
      "pizzar",
    );
  });

  it("hides categories without items", () => {
    const categories: MenuCategory[] = [
      { id: "a", name: "A", items: [] },
      {
        id: "b",
        name: "B",
        items: [
          {
            id: "x",
            name: "X",
            description: "d",
            price: 1,
            image: "/image/menu/x.jpg",
          },
        ],
      },
    ];

    expect(getVisibleMenuCategories(categories).map((c) => c.id)).toEqual([
      "b",
    ]);
  });
});

describe("restaurant filters", () => {
  it("returns every restaurant without filters", () => {
    expect(search({})).toHaveLength(restaurants.length);
  });

  it("filters by cuisine", () => {
    expect(search({ cuisine: "breakfast" })).toEqual(["casa-tchicau"]);
  });

  it("filters by area", () => {
    expect(search({ area: "calhau" })).toEqual([]);
    expect(search({ area: "mindelo" })).toHaveLength(restaurants.length);
  });

  it("searches by restaurant name", () => {
    expect(search({ q: "tchicau" })).toEqual(["casa-tchicau"]);
  });

  it("matches part of a name", () => {
    expect(search({ q: "pizzar" })).toEqual(["pizzar", "monte-cara"]);
  });

  it("ignores accents and letter case", () => {
    expect(search({ q: "CHA de alecrim" })).toEqual(["pizzar"]);
  });

  it("searches by dish name", () => {
    expect(search({ q: "cachupa" })).toEqual(["monte-cara", "casa-tchicau"]);
    expect(search({ q: "octopus" })).toEqual(["monte-cara"]);
  });

  it("combines filters", () => {
    expect(search({ cuisine: "pizza", q: "cachupa" })).toEqual(["monte-cara"]);
    expect(search({ cuisine: "breakfast", q: "cachupa" })).toEqual([
      "casa-tchicau",
    ]);
    expect(search({ cuisine: "breakfast", q: "octopus" })).toEqual([]);
  });

  it("combines filters", () => {
    expect(search({ cuisine: "pizza", q: "cachupa" })).toEqual(["monte-cara"]);
    expect(search({ cuisine: "breakfast", q: "cachupa" })).toEqual([
      "casa-tchicau",
    ]);
    expect(search({ cuisine: "breakfast", q: "octopus" })).toEqual([]);
  });

  it("lists unique cuisines", () => {
    expect(getCuisineIds(restaurants)).toEqual([
      "pizza",
      "cape-verdean",
      "breakfast",
    ]);
  });

  it("selects featured and popular restaurants", () => {
    expect(getFeaturedRestaurants(restaurants).map((r) => r.id)).toEqual([
      "pizzar",
      "casa-tchicau",
    ]);
    expect(getPopularRestaurants(restaurants).map((r) => r.id)).toEqual([
      "monte-cara",
      "casa-tchicau",
    ]);
  });
});

describe("restaurant search params", () => {
  it("parses valid values", () => {
    expect(
      parseRestaurantFilters(
        { q: " pizza ", area: "calhau", cuisine: "pizza" },
        AREAS,
      ),
    ).toEqual({ q: "pizza", area: "calhau", cuisine: "pizza" });
  });

  it("ignores an unknown area and takes the first of repeated values", () => {
    expect(
      parseRestaurantFilters({ area: "mars", q: ["a", "b"] }, AREAS),
    ).toEqual({ q: "a", area: "", cuisine: "" });
  });

  it("limits the length of the query", () => {
    expect(
      parseRestaurantFilters({ q: "a".repeat(200) }, AREAS).q,
    ).toHaveLength(80);
  });

  it("detects active filters", () => {
    expect(hasActiveFilters(NO_FILTERS)).toBe(false);
    expect(hasActiveFilters({ ...NO_FILTERS, area: "calhau" })).toBe(true);
  });

  it("builds a restaurants href", () => {
    expect(buildRestaurantsHref(NO_FILTERS)).toBe("/restaurants");
    expect(
      buildRestaurantsHref({ q: "bolo de mel", area: "", cuisine: "pizza" }),
    ).toBe("/restaurants?q=bolo+de+mel&cuisine=pizza");
  });

  it("adds the page only after the first page", () => {
    expect(buildRestaurantsHref(NO_FILTERS, 1)).toBe("/restaurants");
    expect(buildRestaurantsHref(NO_FILTERS, 3)).toBe("/restaurants?page=3");
    expect(buildRestaurantsHref({ ...NO_FILTERS, cuisine: "pizza" }, 2)).toBe(
      "/restaurants?cuisine=pizza&page=2",
    );
  });
});

describe("getInitials", () => {
  it("uses the first letters of the first two words", () => {
    expect(getInitials("Pizzaria Monte Cara")).toBe("PM");
    expect(getInitials("Casa Tchicau")).toBe("CT");
  });

  it("works with a single word", () => {
    expect(getInitials("PIZZAR")).toBe("P");
  });
});
