import type { IconType } from "react-icons";
import {
  LuCar,
  LuCarTaxiFront,
  LuMusic,
  LuSunset,
  LuUtensils,
} from "react-icons/lu";

type HeroCategory = {
  id: string;
  label: string;
  href: string;
  icon: IconType;
};

export const HERO_CONFIG = {
  image: {
    src: "/heroImage.jpg",
    alt: "Beach and bay of Mindelo in São Vicente, Cape Verde",
  },
  badge: "Welcome to Mindelo · São Vicente",
  heading: "Your Gateway to the Mindelo Experience.",
  description: {
    highlight: "Eat, explore & feel the vibe.",
    text: " Discover authentic local flavours, vibrant music, colourful streets and breathtaking ocean views. Immerse yourself in Mindelo's rich culture, lively atmosphere and unforgettable experiences.",
  },
  search: {
    action: "/explore",
    locationName: "location",
    locationLabel: "Choose your location",
    locationPlaceholder: "Choose your location",
    locations: [
      { label: "Mindelo", value: "mindelo" },
      { label: "Laginha", value: "laginha" },
      { label: "Calhau", value: "calhau" },
      { label: "Baía das Gatas", value: "baia-das-gatas" },
      { label: "Salamansa", value: "salamansa" },
    ],
    inputName: "q",
    inputLabel: "Search restaurants, dishes or events",
    inputPlaceholder: "Search restaurants, dishes or events...",
    submitLabel: "Search",
  },
  categories: [
    {
      id: "restaurants",
      label: "Restaurants",
      href: "/restaurants",
      icon: LuUtensils,
    },
    { id: "events", label: "Events", href: "/events", icon: LuMusic },
    {
      id: "sunset-spots",
      label: "Sunset Spots",
      href: "/sunset-spots",
      icon: LuSunset,
    },
    { id: "taxi", label: "Taxi", href: "/taxi", icon: LuCarTaxiFront },
    {
      id: "car-rental",
      label: "Car Rental",
      href: "/car-rental",
      icon: LuCar,
    },
  ] satisfies HeroCategory[],
};
