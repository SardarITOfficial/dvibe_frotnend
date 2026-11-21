export type FlavourItem = {
  id: string;
  image: string;
};

export const FLAVOURS_CONFIG = {
  href: "/restaurants",
  flavours: [
    { id: "cachupa", image: "/image/flavours/cachupa.jpg" },
    { id: "friedMoray", image: "/image/flavours/fried-moray.jpg" },
    { id: "octopus", image: "/image/flavours/octopus.png" },
    { id: "fish", image: "/image/flavours/fish.png" },
    { id: "shrimp", image: "/image/flavours/shrimp.png" },
    { id: "chicken", image: "/image/flavours/chicken.png" },
  ] satisfies FlavourItem[],
};
