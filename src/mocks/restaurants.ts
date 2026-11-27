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
  mapUrl?: string;
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
      image: "/image/restaurants/restaurants1.webp",
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
      image: "/image/restaurants/restaurants2.jpg",
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
      image: "/image/restaurants/restaurants3.jpg",
      rating: 4.8,
      reviewCount: 57,
      services: ["takeaway"],
      isFeatured: true,
      isPopular: true,
    },
    {
      id: "cantinho-do-mar",
      name: "Cantinho do Mar",
      location: "Fonte Filipe, Mindelo",
      area: "mindelo",
      cuisines: ["cape-verdean"],
      hours: "11:00-23:00",
      href: "/restaurants/cantinho-do-mar",
      image: "/image/restaurants/restaurants4.jpg",
      rating: 4.5,
      reviewCount: 73,
      services: ["takeaway", "reservation"],
      isFeatured: false,
      isPopular: true,
    },
    {
      id: "pao-quente",
      name: "Pão Quente",
      location: "Rua de Lisboa, Mindelo",
      area: "mindelo",
      cuisines: ["breakfast"],
      hours: "06:30-12:00",
      href: "/restaurants/pao-quente",
      image: "/image/restaurants/restaurants5.jpg",
      rating: 4.3,
      reviewCount: 41,
      services: ["takeaway"],
      isFeatured: false,
      isPopular: false,
    },
    {
      id: "forno-da-praca",
      name: "Forno da Praça",
      location: "Praça Nova, Mindelo",
      area: "mindelo",
      cuisines: ["pizza", "cape-verdean"],
      hours: "12:00-00:00",
      href: "/restaurants/forno-da-praca",
      image: "/image/restaurants/restaurants6.jpg",
      rating: 4.7,
      reviewCount: 98,
      services: ["takeaway", "reservation"],
      isFeatured: true,
      isPopular: false,
    },
  ] satisfies RestaurantItem[],
};
