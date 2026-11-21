import type { IconType } from "react-icons";
import {
  LuCar,
  LuCarTaxiFront,
  LuMusic,
  LuSunset,
  LuUtensils,
} from "react-icons/lu";

import { FEATURES } from "@/constants/features";

type HeroCategory = {
  id: string;
  href: string;
  icon: IconType;
  enabled?: boolean;
};

const HERO_CATEGORIES = [
  { id: "restaurants", href: "/restaurants", icon: LuUtensils },
  { id: "events", href: "/events", icon: LuMusic },
  { id: "sunset-spots", href: "/sunset-spots", icon: LuSunset },
  { id: "taxi", href: "/taxi", icon: LuCarTaxiFront },
  {
    id: "car-rental",
    href: "/car-rental",
    icon: LuCar,
    enabled: FEATURES.carRental,
  },
] satisfies HeroCategory[];

export const HERO_CONFIG = {
  image: {
    src: "/heroImage.jpg",
  },
  search: {
    action: "/explore",
    locationName: "location",
    inputName: "q",
    locations: [
      "mindelo",
      "laginha",
      "calhau",
      "baia-das-gatas",
      "salamansa",
    ],
  },
  categories: HERO_CATEGORIES.filter(({ enabled = true }) => enabled),
};