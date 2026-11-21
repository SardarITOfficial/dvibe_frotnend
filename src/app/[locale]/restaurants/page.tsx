import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import RestaurantsListing from "@/components/sections/RestaurantsListing";
import { getRestaurants, searchRestaurants } from "@/lib/api/restaurants";
import { buildMetadata } from "@/lib/i18n/metadata";
import { HERO_CONFIG } from "@/mocks/hero";
import type { RestaurantSearchParams } from "@/types";
import { parsePage } from "@/utils/pagination";
import { parseRestaurantFilters } from "@/utils/restaurant";

type RestaurantsPageProps = Readonly<{
  params: Promise<{ locale: string }>;
  searchParams: Promise<RestaurantSearchParams>;
}>;

const AREAS = HERO_CONFIG.search.locations;

export async function generateMetadata({
  params,
}: RestaurantsPageProps): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({ locale, path: "/restaurants" });
}

export default async function RestaurantsPage({
  params,
  searchParams,
}: RestaurantsPageProps) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);

  const filters = parseRestaurantFilters(query, AREAS);
  const [restaurants, results] = await Promise.all([
    getRestaurants(),
    searchRestaurants(filters),
  ]);

  return (
    <main className="min-h-screen">
      <RestaurantsListing
        filters={filters}
        areas={AREAS}
        restaurants={restaurants}
        results={results}
        page={parsePage(query.page)}
      />
    </main>
  );
}