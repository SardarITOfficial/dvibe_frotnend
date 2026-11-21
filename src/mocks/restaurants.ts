export type RestaurantService = "takeaway" | "reservation";

export type RestaurantItem = {
  id: string;
  name: string;
  location: string;
  area: string;
  cuisines: string[];
  hours: string;
  href: string;
  image: string;
  rating: number;
  reviewCount: number;
  services: RestaurantService[];
  isFeatured: boolean;
  isPopular: boolean;
  logo?: string;
  cover?: string;
};

export const RESTAURANTS_CONFIG = {
  href: "/restaurants",
  restaurants: [
    {
      id: "pizzar",
      name: "PIZZAR",
      location: "Chã de Alecrim, Mindelo",
      area: "mindelo",
      cuisines: ["pizza"],
      hours: "10:00-04:00",
      href: "/restaurants/pizzar",
      image: "/image/restaurants/pizzar.jpg",
      rating: 4.6,
      reviewCount: 124,
      services: ["takeaway", "reservation"],
      isFeatured: true,
      isPopular: false,
    },
    {
      id: "monte-cara",
      name: "Pizzaria Monte Cara",
      location: "Monte cara, Mindelo",
      area: "mindelo",
      cuisines: ["pizza", "cape-verdean"],
      hours: "10:00-04:00",
      href: "/restaurants/monte-cara",
      image: "/image/restaurants/monte-cara.jpg",
      rating: 4.4,
      reviewCount: 86,
      services: ["takeaway", "reservation"],
      isFeatured: false,
      isPopular: true,
    },
    {
      id: "casa-tchicau",
      name: "Casa Tchicau",
      location: "Cape Verde, Mindelo",
      area: "mindelo",
      cuisines: ["cape-verdean", "breakfast"],
      hours: "07:00-11:00",
      href: "/restaurants/casa-tchicau",
      image: "/image/restaurants/casa-tchicau.jpg",
      rating: 4.8,
      reviewCount: 57,
      services: ["takeaway"],
      isFeatured: true,
      isPopular: true,
    },
  ] satisfies RestaurantItem[],
};