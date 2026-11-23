import { useTranslations } from "next-intl";

import CartConflictNotice from "@/components/sections/CartConflictNotice";
import FoodCard from "@/components/sections/FoodCard";
import type { RestaurantMenu } from "@/types";
import { getVisibleMenuCategories } from "@/utils/restaurant";

type RestaurantMenuSectionProps = {
  menu: RestaurantMenu;
};

export default function RestaurantMenuSection({
  menu,
}: RestaurantMenuSectionProps) {
  const t = useTranslations("RestaurantProfile");
  const categories = getVisibleMenuCategories(menu.categories);

  return (
    <section
      aria-labelledby="menu-heading"
      className="bg-section-bg pb-12 font-hero lg:pb-15"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4">
        <div className="flex flex-col gap-4">
          <h2
            id="menu-heading"
            className="text-3xl font-bold leading-[1.125] text-accent sm:text-4xl"
          >
            {t("menuTitle")}
          </h2>
          <CartConflictNotice restaurantId={menu.restaurantId} />
        </div>

        {categories.length === 0 ? (
          <p className="text-muted">{t("emptyMenu")}</p>
        ) : (
          <>
            {categories.length > 1 && (
              <nav
                aria-label={t("categoriesLabel")}
                className="sticky top-22 z-40 -mx-4 overflow-x-auto bg-section-bg/95 px-4 py-3 backdrop-blur lg:top-26"
              >
                <ul className="flex gap-3">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <a
                        href={`#category-${category.id}`}
                        className="inline-flex whitespace-nowrap rounded-full border border-border bg-background px-5 py-2 text-sm font-medium text-charcoal transition-colors hover:border-accent hover:text-accent"
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div className="flex flex-col gap-12">
              {categories.map((category) => (
                <section
                  key={category.id}
                  id={`category-${category.id}`}
                  aria-labelledby={`category-${category.id}-title`}
                  className="flex scroll-mt-40 flex-col gap-5 lg:scroll-mt-44"
                >
                  <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                    <h3
                      id={`category-${category.id}-title`}
                      className="text-xl font-bold text-charcoal sm:text-2xl"
                    >
                      {category.name}
                    </h3>
                    <p className="shrink-0 text-sm text-muted">
                      {t("cart.items", { count: category.items.length })}
                    </p>
                  </div>
                  <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {category.items.map((item) => (
                      <li key={item.id}>
                        <FoodCard
                          item={item}
                          restaurantId={menu.restaurantId}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}