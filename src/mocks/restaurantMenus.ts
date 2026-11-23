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
            image: "/image/restaurants/pizzar.jpg",
          },
          {
            id: "quatro-formaggi",
            name: "Quattro Formaggi",
            description: "Four cheeses on a thin, crispy base.",
            price: 1200,
            image: "/image/restaurants/pizzar.jpg",
          },
          {
            id: "tuna-onion",
            name: "Tuna & Onion",
            description: "Tuna, red onion and mozzarella.",
            price: 950,
            image: "/image/restaurants/pizzar.jpg",
          },
        ],
      },
      {
        id: "mains",
        name: "Mains",
        items: [
          {
            id: "grilled-chicken",
            name: "Grilled Chicken",
            description: "Marinated chicken with rice and salad.",
            price: 900,
            image: "/image/flavours/chicken.png",
          },
          {
            id: "grilled-shrimp",
            name: "Grilled Shrimp",
            description: "Garlic shrimp served with lemon.",
            price: 1300,
            image: "/image/flavours/shrimp.png",
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
            image: "/image/flavours/cachupa.jpg",
          },
          {
            id: "grilled-fish",
            name: "Grilled Fish",
            description: "Catch of the day with rice and salad.",
            price: 1100,
            image: "/image/flavours/fish.png",
          },
          {
            id: "chicken",
            name: "Roast Chicken",
            description: "Slow-roasted chicken with local sides.",
            price: 900,
            image: "/image/flavours/chicken.png",
          },
        ],
      },
      {
        id: "seafood",
        name: "Seafood",
        items: [
          {
            id: "octopus",
            name: "Grilled Octopus",
            description: "Tender octopus with potatoes and olive oil.",
            price: 1500,
            image: "/image/flavours/octopus.png",
          },
          {
            id: "shrimp",
            name: "Garlic Shrimp",
            description: "Shrimp sautéed in garlic and butter.",
            price: 1300,
            image: "/image/flavours/shrimp.png",
          },
        ],
      },
      {
        id: "pizzas",
        name: "Pizzas",
        items: [
          {
            id: "house-pizza",
            name: "House Pizza",
            description: "Mozzarella, ham, mushrooms and olives.",
            price: 1000,
            image: "/image/restaurants/monte-cara.jpg",
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
            image: "/image/restaurants/casa-tchicau.jpg",
          },
          {
            id: "pastel",
            name: "Pastel de Atum",
            description: "Fried pastry filled with seasoned tuna.",
            price: 150,
            image: "/image/flavours/fried-moray.jpg",
          },
        ],
      },
      {
        id: "traditional-plates",
        name: "Traditional plates",
        items: [
          {
            id: "cachupa-frita",
            name: "Cachupa Frita",
            description: "Fried cachupa served with a fried egg.",
            price: 500,
            image: "/image/flavours/cachupa.jpg",
          },
          {
            id: "fried-moray",
            name: "Fried Moray",
            description: "Crispy fried moray with cassava.",
            price: 1200,
            image: "/image/flavours/fried-moray.jpg",
          },
        ],
      },
    ],
  },
] satisfies RestaurantMenu[];