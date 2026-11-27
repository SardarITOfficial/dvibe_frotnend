import { RESTAURANT_MENUS } from "@/mocks/restaurantMenus";
import { RESTAURANTS_CONFIG } from "@/mocks/restaurants";
import type { RestaurantFilters, RestaurantMenu } from "@/types";
import { filterRestaurants } from "@/utils/restaurant";

export async function getRestaurants() {
  return RESTAURANTS_CONFIG.restaurants;
}

export async function getRestaurant(id: string) {
  return RESTAURANTS_CONFIG.restaurants.find(
    (restaurant) => restaurant.id === id,
  );
}

export async function searchRestaurants(filters: RestaurantFilters) {
  return filterRestaurants(
    RESTAURANTS_CONFIG.restaurants,
    RESTAURANT_MENUS,
    filters,
  );
}

export async function getRestaurantMenu(
  restaurantId: string,
): Promise<RestaurantMenu | undefined> {
  const menu = RESTAURANT_MENUS.find(
    (entry) => entry.restaurantId === restaurantId,
  );

  if (!menu) return undefined;

  return {
    ...menu,
    categories: menu.categories.map((category) => ({
      ...category,
      items: category.items.map((item) => ({ ...item, isAvailable: true })),
    })),
  };
}
