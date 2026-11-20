export type RestaurantItem = {
  id: string;
  name: string;
  location: string;
  hours: string;
  href: string;
  image: string;
};

export const RESTAURANTS_CONFIG = {
  href: "/restaurants",
  restaurants: [
    {
      id: "pizzar",
      name: "PIZZAR",
      location: "Chã de Alecrim, Mindelo",
      hours: "10:00-04:00",
      href: "/restaurants/pizzar",
      image: "/image/restaurants/pizzar.jpg",
    },
    {
      id: "monte-cara",
      name: "Pizzaria Monte Cara",
      location: "Monte cara, Mindelo",
      hours: "10:00-04:00",
      href: "/restaurants/monte-cara",
      image: "/image/restaurants/monte-cara.jpg",
    },
    {
      id: "casa-tchicau",
      name: "Casa Tchicau",
      location: "Cape Verde, Mindelo",
      hours: "07:00-11:00",
      href: "/restaurants/casa-tchicau",
      image: "/image/restaurants/casa-tchicau.jpg",
    },
  ] satisfies RestaurantItem[],
};