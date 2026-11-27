import { useTranslations } from "next-intl";

import PageHero from "@/components/common/PageHero";
import RestaurantGroup from "@/components/sections/RestaurantGroup";
import RestaurantSearchForm from "@/components/sections/RestaurantSearchForm";
import { Pagination } from "@/components/ui/Pagination";
import {
  RESTAURANT_HIGHLIGHTS_LIMIT,
  RESTAURANTS_PER_PAGE,
} from "@/constants/restaurants";
import { Link } from "@/lib/i18n/navigation";
import type { RestaurantItem } from "@/mocks/restaurants";
import type { RestaurantFilters } from "@/types";
import { paginate } from "@/utils/pagination";
import {
  buildRestaurantsHref,
  getCuisineIds,
  getFeaturedRestaurants,
  getPopularRestaurants,
  hasActiveFilters,
} from "@/utils/restaurant";

type RestaurantsListingProps = {
  filters: RestaurantFilters;
  areas: readonly string[];
  restaurants: RestaurantItem[];
  results: RestaurantItem[];
  page: number;
};

export default function RestaurantsListing({
  filters,
  areas,
  restaurants,
  results,
  page,
}: RestaurantsListingProps) {
  const t = useTranslations("Restaurants");

  const isFiltering = hasActiveFilters(filters);
  const featured = getFeaturedRestaurants(restaurants).slice(
    0,
    RESTAURANT_HIGHLIGHTS_LIMIT,
  );
  const popular = getPopularRestaurants(restaurants).slice(
    0,
    RESTAURANT_HIGHLIGHTS_LIMIT,
  );
  const cuisines = ["", ...getCuisineIds(restaurants)];

  const listed = isFiltering ? results : restaurants;
  const listId = isFiltering ? "restaurants-results" : "restaurants-all";
  const {
    items: pageItems,
    currentPage,
    totalPages,
  } = paginate(listed, page, RESTAURANTS_PER_PAGE);

  return (
    <>
      <PageHero
        id="restaurants-listing-heading"
        eyebrow={t("listing.eyebrow")}
        title={t("listing.title")}
        description={t("listing.description")}
      />

      <section className="bg-section-bg py-12 font-hero lg:py-15">
        <div className="container mx-auto flex flex-col gap-10 px-4 lg:gap-12">
          <div className="flex flex-col gap-5">
            <RestaurantSearchForm
              key={`${filters.q}|${filters.area}|${filters.cuisine}`}
              filters={filters}
              areas={areas}
            />

            <nav aria-label={t("listing.cuisinesLabel")}>
              <ul className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3 sm:overflow-x-auto sm:pb-1">
                {cuisines.map((cuisine) => {
                  const isActive = filters.cuisine === cuisine;

                  return (
                    <li key={cuisine || "all"}>
                      <Link
                        href={buildRestaurantsHref({ ...filters, cuisine })}
                        aria-current={isActive ? "true" : undefined}
                        className={`inline-flex whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-opacity hover:opacity-80 ${
                          isActive
                            ? "bg-accent text-background"
                            : "bg-accent-soft text-ink"
                        }`}
                      >
                        {cuisine
                          ? t(`cuisines.${cuisine}`)
                          : t("listing.allCuisines")}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {!isFiltering && featured.length > 0 && (
            <RestaurantGroup
              id="restaurants-featured"
              title={t("listing.featured")}
              restaurants={featured}
              layout="scroll"
            />
          )}

          {!isFiltering && popular.length > 0 && (
            <RestaurantGroup
              id="restaurants-popular"
              title={t("listing.popular")}
              restaurants={popular}
              layout="scroll"
            />
          )}

          {listed.length > 0 && (
            <RestaurantGroup
              id={listId}
              title={
                isFiltering
                  ? t("listing.results", { count: results.length })
                  : t("listing.all")
              }
              restaurants={pageItems}
              footer={
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  getHref={(target) =>
                    `${buildRestaurantsHref(filters, target)}#${listId}`
                  }
                  getPageLabel={(target) =>
                    t("listing.pagination.page", { page: target })
                  }
                  navigationLabel={t("listing.pagination.navigation")}
                  previousLabel={t("listing.pagination.previous")}
                  nextLabel={t("listing.pagination.next")}
                />
              }
            />
          )}

          {isFiltering && results.length === 0 && (
            <div
              role="status"
              className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-background p-6"
            >
              <p className="text-muted">{t("listing.empty")}</p>
              <Link
                href="/restaurants"
                className="text-sm font-semibold text-accent transition-opacity hover:opacity-80"
              >
                {t("listing.clear")}
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}