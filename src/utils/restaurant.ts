import type { RestaurantMenu } from "@/mocks/restaurantMenus";
import type { RestaurantItem } from "@/mocks/restaurants";
import type { RestaurantFilters, RestaurantSearchParams } from "@/types";

const MAX_QUERY_LENGTH = 80;

export function getRestaurantById(
  restaurants: RestaurantItem[],
  id: string,
): RestaurantItem | undefined {
  return restaurants.find((restaurant) => restaurant.id === id);
}

export function getRestaurantMenu(
  menus: RestaurantMenu[],
  restaurantId: string,
): RestaurantMenu | undefined {
  return menus.find((menu) => menu.restaurantId === restaurantId);
}

export function getVisibleMenuCategories<
  TCategory extends { items: readonly unknown[] },
>(categories: readonly TCategory[]): TCategory[] {
  return categories.filter((category) => category.items.length > 0);
}

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function firstValue(value?: string | string[]): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export function parseRestaurantFilters(
  searchParams: RestaurantSearchParams,
  areas: readonly string[],
): RestaurantFilters {
  const area = firstValue(searchParams.area);

  return {
    q: firstValue(searchParams.q).trim().slice(0, MAX_QUERY_LENGTH),
    area: areas.includes(area) ? area : "",
    cuisine: firstValue(searchParams.cuisine).trim(),
  };
}

export function hasActiveFilters({ q, area, cuisine }: RestaurantFilters) {
  return Boolean(q || area || cuisine);
}

export function buildRestaurantsHref(
  { q, area, cuisine }: RestaurantFilters,
  page = 1,
) {
  const params = new URLSearchParams();

  if (q) params.set("q", q);
  if (area) params.set("area", area);
  if (cuisine) params.set("cuisine", cuisine);
  if (page > 1) params.set("page", String(page));

  const query = params.toString();

  return query ? `/restaurants?${query}` : "/restaurants";
}

export function getCuisineIds(restaurants: RestaurantItem[]): string[] {
  return [...new Set(restaurants.flatMap((restaurant) => restaurant.cuisines))];
}

export function getFeaturedRestaurants(restaurants: RestaurantItem[]) {
  return restaurants.filter((restaurant) => restaurant.isFeatured);
}

export function getPopularRestaurants(restaurants: RestaurantItem[]) {
  return restaurants.filter((restaurant) => restaurant.isPopular);
}

export function filterRestaurants(
  restaurants: RestaurantItem[],
  menus: RestaurantMenu[],
  { q, area, cuisine }: RestaurantFilters,
): RestaurantItem[] {
  const query = normalize(q);

  return restaurants.filter((restaurant) => {
    if (area && restaurant.area !== area) return false;
    if (cuisine && !restaurant.cuisines.includes(cuisine)) return false;
    if (!query) return true;

    const dishes =
      getRestaurantMenu(menus, restaurant.id)?.categories.flatMap((category) =>
        category.items.map((item) => `${item.name} ${item.description}`),
      ) ?? [];

    return [restaurant.name, restaurant.location, ...dishes].some((text) =>
      normalize(text).includes(query),
    );
  });
}
export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}