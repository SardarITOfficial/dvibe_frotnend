export type FooterLink = {
  id: string;
  href: string;
};

export type FooterColumn = {
  id: string;
  links: FooterLink[];
};

export const FOOTER_CONFIG = {
  logo: "/logo_light.png",
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    id: "explore",
    links: [
      { id: "restaurants", href: "/restaurants" },
      { id: "flavours", href: "/foods" },
      { id: "vibe", href: "/vibe" },
      { id: "mindelo", href: "/explore" },
    ],
  },
  {
    id: "partners",
    links: [
      { id: "partner-portal", href: "/partners" },
      { id: "register-place", href: "/partners/register" },
    ],
  },
  {
    id: "support",
    links: [
      { id: "help-center", href: "/help" },
      { id: "privacy-policy", href: "/privacy" },
      { id: "terms", href: "/terms" },
      { id: "contact", href: "/contact" },
    ],
  },
];