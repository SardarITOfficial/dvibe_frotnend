export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isAvailable: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

export type RestaurantMenu = {
  restaurantId: string;
  whatsapp: string;
  categories: MenuCategory[];
};

export type RestaurantFilters = {
  q: string;
  area: string;
  cuisine: string;
};

export type RestaurantSearchParams = {
  q?: string | string[];
  area?: string | string[];
  cuisine?: string | string[];
  page?: string | string[];
};