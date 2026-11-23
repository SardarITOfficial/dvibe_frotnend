import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { FiArrowRight, FiClock, FiMapPin } from "react-icons/fi";

import { Link } from "@/lib/i18n/navigation";
import type { Tour } from "@/mocks/tours";

type TourCardProps = {
  tour: Tour;
};

export default function TourCard({
  tour: { id, location, durationHours, price, image },
}: TourCardProps) {
  const t = useTranslations("Tours");
  const format = useFormatter();

  const name = t(`items.${id}.name`);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-background shadow-md focus-within:ring-2 focus-within:ring-accent">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 px-4 pb-4 pt-5">
        <div className="flex flex-col gap-2">
          <h3 className="font-hero text-base font-semibold text-charcoal">
            {name}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">
            {t(`items.${id}.description`)}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border pt-4 text-sm font-medium">
          <p className="flex items-center gap-2 text-charcoal">
            <FiMapPin size={14} aria-hidden className="shrink-0 text-sun" />
            {location}
          </p>
          <p className="flex items-center gap-2 text-accent">
            <FiClock size={14} aria-hidden className="shrink-0" />
            {t("duration", { hours: durationHours })}
          </p>
        </div>

        <p className="flex items-baseline gap-2">
          <span className="font-hero text-lg font-bold text-sun">
            {t("price", { amount: format.number(price) })}
          </span>
          <span className="text-xs text-muted">{t("perPerson")}</span>
        </p>

        <Link
          href={`/tours/${id}`}
          className="inline-flex w-full items-center justify-center gap-3 rounded-full border-2 border-accent px-6 py-2.5 text-base font-medium text-accent outline-none transition-opacity hover:opacity-80 after:absolute after:inset-0"
        >
          {t("card.viewDetails")}
          <FiArrowRight size={16} aria-hidden className="shrink-0" />
          <span className="sr-only">: {name}</span>
        </Link>
      </div>
    </article>
  );
}