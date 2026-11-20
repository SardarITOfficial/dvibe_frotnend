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
  href: string;
  icon: IconType;
};

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
  categories: [
    { id: "restaurants", href: "/restaurants", icon: LuUtensils },
    { id: "events", href: "/events", icon: LuMusic },
    { id: "sunset-spots", href: "/sunset-spots", icon: LuSunset },
    { id: "taxi", href: "/taxi", icon: LuCarTaxiFront },
    { id: "car-rental", href: "/car-rental", icon: LuCar },
  ] satisfies HeroCategory[],
};