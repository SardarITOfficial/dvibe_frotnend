import { useFormatter, useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";
import {
  VIBE_DATE_FORMAT,
  VIBE_SHORT_DATE_FORMAT,
  VIBE_TIME_FILTERS,
  buildVibeHref,
  getVibeDateRange,
  parseVibeDate,
  type VibeFilter,
  type VibeTimeFilter,
} from "@/utils/vibe";

type VibeTimeFiltersProps = {
  active: VibeTimeFilter;
  category: VibeFilter;
  today: string;
};

export default function VibeTimeFilters({
  active,
  category,
  today,
}: VibeTimeFiltersProps) {
  const t = useTranslations("Vibe.page.time");
  const format = useFormatter();

  const getSublabel = (filter: VibeTimeFilter) => {
    if (filter === "upcoming") {
      return t("fromToday");
    }

    const { from, to } = getVibeDateRange(filter, today);

    if (filter === "today" || filter === "tomorrow") {
      return format.dateTime(parseVibeDate(from), VIBE_DATE_FORMAT);
    }

    const start = format.dateTime(parseVibeDate(from), VIBE_SHORT_DATE_FORMAT);

    return to === null || to === from
      ? start
      : `${start} – ${format.dateTime(parseVibeDate(to), VIBE_SHORT_DATE_FORMAT)}`;
  };

  return (
    <nav aria-label={t("label")}>
      <ul className="flex flex-wrap gap-3">
        {VIBE_TIME_FILTERS.map((filter) => {
          const isActive = filter === active;

          return (
            <li key={filter}>
              <Link
                href={buildVibeHref({ category, time: filter })}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-w-32 flex-col rounded-xl border px-4 py-2 transition-opacity hover:opacity-80 ${
                  isActive
                    ? "border-accent bg-accent text-background"
                    : "border-border bg-background text-ink"
                }`}
              >
                <span className="text-sm font-semibold">{t(filter)}</span>
                <span
                  className={`text-xs ${isActive ? "text-background/80" : "text-muted"}`}
                >
                  {getSublabel(filter)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}