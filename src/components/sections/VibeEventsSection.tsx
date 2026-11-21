import { useTranslations } from "next-intl";

import VibeEventCard from "@/components/sections/VibeEventCard";
import VibeFilters from "@/components/sections/VibeFilters";
import VibeTimeFilters from "@/components/sections/VibeTimeFilters";
import { VIBE_EVENTS } from "@/mocks/vibeEvents";
import {
  filterVibeEvents,
  type VibeFilter,
  type VibeTimeFilter,
} from "@/utils/vibe";

type VibeEventsSectionProps = {
  category: VibeFilter;
  time: VibeTimeFilter;
  today: string;
};

export default function VibeEventsSection({
  category,
  time,
  today,
}: VibeEventsSectionProps) {
  const t = useTranslations("Vibe");
  const events = filterVibeEvents(VIBE_EVENTS, { category, time, today });

  return (
    <section
      aria-labelledby="vibe-events-heading"
      className="bg-section-bg py-12 font-hero lg:py-15"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4 lg:gap-12">
        <div className="flex flex-col gap-6">
          <h2
            id="vibe-events-heading"
            className="font-hero text-3xl font-bold leading-[1.125] text-accent sm:text-4xl"
          >
            {t("page.eventsTitle")}
          </h2>
          <div className="flex flex-col gap-4">
            <VibeFilters active={category} time={time} />
            <VibeTimeFilters active={time} category={category} today={today} />
          </div>
        </div>

        {events.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <li key={event.id}>
                <VibeEventCard event={event} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-base text-muted">{t("page.empty")}</p>
        )}
      </div>
    </section>
  );
}