import type { IconType } from "react-icons";
import { LuSunset, LuWaves, LuWind } from "react-icons/lu";

export type WeatherIcon =
  | { type: "image"; src: string; width: number; height: number }
  | { type: "vector"; component: IconType; className: string };

export type WeatherMetric = {
  id: string;
  value: string;
  icon: WeatherIcon;
};

export const WEATHER_CONFIG = {
  image: "/image/categories/weatherBG.jpg",
  metrics: [
    {
      id: "temperature",
      value: "25°C",
      icon: {
        type: "image",
        src: "/image/weather/partly-cloudy.png",
        width: 40,
        height: 40,
      },
    },
    {
      id: "sunset",
      value: "18:05",
      icon: { type: "vector", component: LuSunset, className: "text-sun" },
    },
    {
      id: "wind",
      value: "31 km/h",
      icon: { type: "vector", component: LuWind, className: "text-sun" },
    },
    {
      id: "sea",
      value: "1.3 m",
      icon: { type: "vector", component: LuWaves, className: "text-accent" },
    },
  ] satisfies WeatherMetric[],
};