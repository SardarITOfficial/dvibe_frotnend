import { useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";
import {
  VIBE_CATEGORY_IDS,
  buildVibeHref,
  type VibeFilter,
  type VibeTimeFilter,
} from "@/utils/vibe";

const FILTERS: VibeFilter[] = ["all", ...VIBE_CATEGORY_IDS];

type VibeFiltersProps = {
  active: VibeFilter;
  time: VibeTimeFilter;
};

export default function VibeFilters({ active, time }: VibeFiltersProps) {
  const t = useTranslations("Vibe");

  return (
    <nav aria-label={t("page.filtersLabel")}>
      <ul className="flex flex-wrap gap-3">
        {FILTERS.map((filter) => {
          const isActive = filter === active;

          return (
            <li key={filter}>
              <Link
                href={buildVibeHref({ category: filter, time })}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex rounded-full px-5 py-2 text-sm font-medium transition-opacity hover:opacity-80 ${
                  isActive ? "bg-accent text-background" : "bg-accent-soft text-ink"
                }`}
              >
                {filter === "all" ? t("page.all") : t(`items.${filter}.title`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}