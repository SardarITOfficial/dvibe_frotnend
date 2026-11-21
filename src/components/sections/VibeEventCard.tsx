import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiClock, FiMapPin } from "react-icons/fi";

import type { VibeEvent } from "@/mocks/vibeEvents";

type VibeEventCardProps = {
  event: VibeEvent;
};

export default function VibeEventCard({
  event: { category, title, location, time, image },
}: VibeEventCardProps) {
  const t = useTranslations("Vibe");

  return (
    <article className="overflow-hidden rounded-xl bg-background shadow-md">
      <div className="relative aspect-video w-full">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background_deep/80 px-3 py-1 text-xs font-medium text-sun">
          {t(`items.${category}.title`)}
        </span>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-4 pt-5">
        <h3 className="font-hero text-base font-semibold text-charcoal">
          {title}
        </h3>

        <div className="flex items-center justify-between gap-4 border-t border-border pt-4 text-sm font-medium">
          <p className="flex items-center gap-2 text-charcoal">
            <FiMapPin size={14} aria-hidden className="shrink-0 text-sun" />
            {location}
          </p>
          <p className="flex items-center gap-2 text-accent">
            <FiClock size={14} aria-hidden className="shrink-0" />
            {time}
          </p>
        </div>
      </div>
    </article>
  );
}