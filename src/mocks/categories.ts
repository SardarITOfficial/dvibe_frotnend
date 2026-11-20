export type CategoryItem = {
  id: string;
  href: string;
  image: string;
};

export const CATEGORIES_CONFIG = {
  categories: [
    { id: "food", href: "/foods", image: "/image/categories/food.png" },
    { id: "vibe", href: "/vibe", image: "/image/categories/vibe.jpg" },
    {
      id: "sunset",
      href: "/sunset-spots",
      image: "/image/categories/sunset.jpg",
    },
    { id: "tours", href: "/tours", image: "/image/categories/tour.jpg" },
    { id: "taxi", href: "/taxi", image: "/image/categories/taxi.jpg" },
  ] satisfies CategoryItem[],
};