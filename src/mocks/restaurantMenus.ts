export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
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

export const RESTAURANT_MENUS = [
  {
    restaurantId: "pizzar",
    whatsapp: "+238 000 00 01",
    categories: [
      {
        id: "pizzas",
        name: "Pizzas",
        items: [
          {
            id: "margherita",
            name: "Margherita",
            description: "Tomato, mozzarella and fresh basil.",
            price: 600,
            image: "/image/menu/pizzar/margherita.jpg",
          },
          {
            id: "quatro-formaggi",
            name: "Quattro Formaggi",
            description: "Four cheeses on a thin, crispy base.",
            price: 1200,
            image: "/image/menu/pizzar/margherita.jpg",
          },
        ],
      },
      {
        id: "desserts",
        name: "Desserts",
        items: [],
      },
    ],
  },
  {
    restaurantId: "monte-cara",
    whatsapp: "+238 000 00 02",
    categories: [
      {
        id: "local-dishes",
        name: "Local dishes",
        items: [
          {
            id: "cachupa",
            name: "Cachupa Rica",
            description: "Slow-cooked corn and beans with meat and fish.",
            price: 800,
            image: "/image/menu/pizzar/margherita.jpg",
          },
          {
            id: "grilled-fish",
            name: "Grilled Fish",
            description: "Catch of the day with rice and salad.",
            price: 1100,
            image: "/image/menu/pizzar/margherita.jpg",
          },
        ],
      },
    ],
  },
  {
    restaurantId: "casa-tchicau",
    whatsapp: "+238 000 00 03",
    categories: [
      {
        id: "breakfast",
        name: "Breakfast",
        items: [
          {
            id: "cuscuz",
            name: "Cuscuz with Milk",
            description: "Traditional Cape Verdean corn couscous.",
            price: 400,
            image: "/image/menu/pizzar/margherita.jpg",
          },
          {
            id: "pastel",
            name: "Pastel de Atum",
            description: "Fried pastry filled with seasoned tuna.",
            price: 150,
            image: "/image/menu/pizzar/margherita.jpg",
          },
        ],
      },
    ],
  },
] satisfies RestaurantMenu[];
