export type CategoryItem = {
  id: string;
  label: string;
  href: string;
  image: string;
};

export const CATEGORIES_CONFIG = {
  eyebrow: "Explore by Categories",
  title: "Discover Mindelo Your Way",
  slider: {
    prevLabel: "Previous categories",
    nextLabel: "Next categories",
  },
  categories: [
    {
      id: "food",
      label: "Food",
      href: "/foods",
      image: "/image/categories/food.jpg",
    },
    {
      id: "vibe",
      label: "Vibe",
      href: "/vibe",
      image: "/image/categories/vibe.jpg",
    },
    {
      id: "sunset",
      label: "Sunset",
      href: "/sunset-spots",
      image: "/image/categories/sunset.jpg",
    },
    {
      id: "tours",
      label: "Tours",
      href: "/tours",
      image: "/image/categories/tours.jpg",
    },
    {
      id: "taxi",
      label: "Taxi",
      href: "/taxi",
      image: "/image/categories/taxi.jpg",
    },
  ] satisfies CategoryItem[],
};