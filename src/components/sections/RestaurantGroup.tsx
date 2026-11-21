import type { ReactNode } from "react";

import RestaurantCard from "@/components/sections/RestaurantCard";
import type { RestaurantItem } from "@/mocks/restaurants";

type RestaurantGroupLayout = "grid" | "scroll";

type RestaurantGroupProps = {
  id: string;
  title: string;
  restaurants: RestaurantItem[];
  layout?: RestaurantGroupLayout;
  footer?: ReactNode;
};

const LIST_CLASSES: Record<RestaurantGroupLayout, string> = {
  grid: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
  scroll:
    "-mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:py-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden",
};

const ITEM_CLASSES: Record<RestaurantGroupLayout, string | undefined> = {
  grid: undefined,
  scroll: "w-72 shrink-0 snap-start sm:w-auto",
};

export default function RestaurantGroup({
  id,
  title,
  restaurants,
  layout = "grid",
  footer,
}: RestaurantGroupProps) {
  return (
    <section
      aria-labelledby={id}
      className="flex scroll-mt-28 flex-col gap-5 lg:scroll-mt-32"
    >
      <h2
        id={id}
        className="text-3xl font-bold leading-[1.125] text-accent sm:text-4xl"
      >
        {title}
      </h2>

      <ul className={LIST_CLASSES[layout]}>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id} className={ITEM_CLASSES[layout]}>
            <RestaurantCard restaurant={restaurant} />
          </li>
        ))}
      </ul>

      {footer}
    </section>
  );
}