import type { IconType } from "react-icons";
import { LuSunset, LuWaves, LuWind } from "react-icons/lu";

export type WeatherIcon =
  | { type: "image"; src: string }
  | { type: "vector"; component: IconType; className: string };

export type WeatherMetric = {
  id: string;
  value: string;
  label: string;
  icon: WeatherIcon;
};

export const WEATHER_CONFIG = {
  title: "Today in Mindelo",
  description: "A little glimpse of what's happening around the island today.",
  image: "/image/weather/beach.jpg",
  metrics: [
    {
      id: "temperature",
      value: "25°C",
      label: "Partly cloudy",
      icon: { type: "image", src: "/image/weather/partly-cloudy.png" },
    },
    {
      id: "sunset",
      value: "18:05",
      label: "Sunset",
      icon: { type: "vector", component: LuSunset, className: "text-sun" },
    },
    {
      id: "wind",
      value: "31 km/h",
      label: "Wind",
      icon: { type: "vector", component: LuWind, className: "text-sun" },
    },
    {
      id: "sea",
      value: "1.3 m",
      label: "Sea",
      icon: { type: "vector", component: LuWaves, className: "text-accent" },
    },
  ] satisfies WeatherMetric[],
};