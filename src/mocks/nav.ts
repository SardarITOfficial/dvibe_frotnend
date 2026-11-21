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

export const NAV_LINKS = [
  { key: "explore", path: "/explore" },
  { key: "vibe", path: "/vibe" },
  { key: "foods", path: "/restaurants" },
  {
    key: "services",
    path: "/services",
    children: [
      { key: "webDesign", path: "/services/web-design" },
      { key: "photography", path: "/services/photography" },
      { key: "transport", path: "/services/transport" },
      { key: "events", path: "/services/events" },
    ],
  },
];