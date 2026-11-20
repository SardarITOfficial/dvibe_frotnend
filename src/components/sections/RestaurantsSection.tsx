import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";

import RestaurantCard from "@/components/sections/RestaurantCard";
import { Button } from "@/components/ui/Button";
import { RESTAURANTS_CONFIG } from "@/mocks/restaurants";

export default function RestaurantsSection() {
  const t = useTranslations("Restaurants");

  return (
    <section
      aria-labelledby="restaurants-heading"
      className="bg-cream py-12 font-hero lg:py-15"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4 lg:gap-12">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3 sm:gap-4">
            <p className="text-sm font-medium uppercase leading-4 tracking-[2.4px] text-accent sm:text-base">
              {t("eyebrow")}
            </p>
            <h2
              id="restaurants-heading"
              className="font-hero text-3xl font-bold leading-[1.125] text-charcoal sm:text-4xl lg:text-5xl"
            >
              {t("title")}
            </h2>
          </div>

          <Button
            variant="accent"
            href={RESTAURANTS_CONFIG.href}
            className="shrink-0"
          >
            {t("cta")}
            <FiArrowRight size={16} aria-hidden />
          </Button>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RESTAURANTS_CONFIG.restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              <RestaurantCard restaurant={restaurant} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}