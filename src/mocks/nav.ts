type NavLink = {
  key: string;
  path: string;
  children?: { key: string; path: string }[];
};

export const HEADER_CONFIG = {
  brand: {
    name: "DVIBE",
    logo: "/logo.svg",
    href: "/",
  },
  cta: {
    href: "/login",
  },
};

export const NAV_LINKS: NavLink[] = [
  { key: "explore", path: "/#hero" },
  { key: "vibe", path: "/vibe" },
  { key: "restaurants", path: "/restaurants" },
  { key: "sunsetSpots", path: "/sunset-spots" },
  { key: "taxi", path: "/taxi" },
  { key: "carRental", path: "/car-rental" },
];