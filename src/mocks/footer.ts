import type { IconType } from "react-icons";
import { LuFacebook, LuInstagram } from "react-icons/lu";

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
export type SocialLink = {
  id: string;
  href: string;
  icon: IconType;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "instagram",
    href: "https://www.instagram.com/REPLACE_WITH_DVIBE_HANDLE",
    icon: LuInstagram,
  },
  {
    id: "facebook",
    href: "https://www.facebook.com/REPLACE_WITH_DVIBE_PAGE",
    icon: LuFacebook,
  },
];
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    id: "explore",
    links: [
      { id: "restaurants", href: "/restaurants" },
      { id: "flavours", href: "/restaurants" },
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
