import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { FiCalendar, FiMapPin } from "react-icons/fi";

import { Link } from "@/lib/i18n/navigation";
import type { VibeEvent } from "@/mocks/vibeEvents";
import { VIBE_SHORT_DATE_FORMAT, parseVibeDate } from "@/utils/vibe";

type VibeEventCardProps = {
  event: VibeEvent;
};

export default function VibeEventCard({
  event: { id, category, title, date, location, time, image },
}: VibeEventCardProps) {
  const t = useTranslations("Vibe");
  const format = useFormatter();

  return (
    <article className="group relative overflow-hidden rounded-xl bg-background shadow-md focus-within:ring-2 focus-within:ring-accent">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background_deep/80 px-3 py-1 text-xs font-medium text-sun">
          {t(`items.${category}.title`)}
        </span>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-4 pt-5">
        <h3 className="font-hero text-base font-semibold text-charcoal">
          <Link
            href={`/vibe/${id}`}
            className="outline-none after:absolute after:inset-0"
          >
            {title}
          </Link>
        </h3>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border pt-4 text-sm font-medium">
          <p className="flex items-center gap-2 text-charcoal">
            <FiMapPin size={14} aria-hidden className="shrink-0 text-sun" />
            {location}
          </p>
          <p className="flex items-center gap-2 text-accent">
            <FiCalendar size={14} aria-hidden className="shrink-0" />
            {format.dateTime(parseVibeDate(date), VIBE_SHORT_DATE_FORMAT)} ·{" "}
            {time}
          </p>
        </div>
      </div>
    </article>
  );
}