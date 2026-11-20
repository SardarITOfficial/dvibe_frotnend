export type IslandItem = {
  id: string;
  href: string;
  image: string;
};

export const ISLAND_CONFIG = {
  href: "/explore",
  places: [
    {
      id: "beaches",
      href: "/beaches",
      image: "/image/island/beaches.jpg",
    },
    {
      id: "sunset-spots",
      href: "/sunset-spots",
      image: "/image/island/sunset-spots.jpg",
    },
    {
      id: "tours",
      href: "/tours",
      image: "/image/island/tours.jpg",
    },
  ] satisfies IslandItem[],
};