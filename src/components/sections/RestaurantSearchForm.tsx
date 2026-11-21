"use client";

import type { FormEvent } from "react";
import { useTranslations } from "next-intl";
import { FiMapPin, FiSearch } from "react-icons/fi";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useRouter } from "@/lib/i18n/navigation";
import type { RestaurantFilters } from "@/types";
import { buildRestaurantsHref } from "@/utils/restaurant";

type RestaurantSearchFormProps = {
  filters: RestaurantFilters;
  areas: readonly string[];
};

export default function RestaurantSearchForm({
  filters,
  areas,
}: RestaurantSearchFormProps) {
  const t = useTranslations("Restaurants.listing");
  const tHero = useTranslations("Hero");
  const router = useRouter();

  const areaOptions = [
    { value: "", label: t("allAreas") },
    ...areas.map((id) => ({ value: id, label: tHero(`locations.${id}`) })),
  ];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    router.push(
      buildRestaurantsHref({
        q: String(data.get("q") ?? "").trim(),
        area: String(data.get("area") ?? ""),
        cuisine: String(data.get("cuisine") ?? ""),
      }),
    );
  }

  return (
    <form
      role="search"
      noValidate
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-2 rounded-3xl border border-border bg-background p-2 shadow-md sm:flex-row sm:items-center sm:gap-6 sm:rounded-full sm:py-1"
    >
      <div className="flex min-w-0 flex-col sm:flex-1 sm:flex-row sm:items-center">
        <Select
          name="area"
          aria-label={t("areaLabel")}
          options={areaOptions}
          defaultValue={filters.area}
          variant="bare"
          icon={<FiMapPin size={16} strokeWidth={1.5} />}
          wrapperClassName="h-12.5 w-full shrink-0 border-b-[0.2px] border-subtle pl-4 sm:w-56 sm:border-b-0 sm:border-r-[0.2px]"
        />

        <Input
          name="q"
          type="search"
          aria-label={t("searchLabel")}
          placeholder={t("searchPlaceholder")}
          defaultValue={filters.q}
          variant="bare"
          icon={<FiSearch size={16} strokeWidth={1.5} />}
          wrapperClassName="h-12.5 min-w-0 px-4 sm:flex-1"
        />

        <Input type="hidden" name="cuisine" defaultValue={filters.cuisine} />
      </div>

      <Button
        type="submit"
        variant="accent"
        size="md"
        className="w-full sm:w-auto"
      >
        {t("submit")}
      </Button>
    </form>
  );
}