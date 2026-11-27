import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiArrowRight, FiMapPin, FiNavigation } from "react-icons/fi";

import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/i18n/navigation";
import type { RestaurantItem } from "@/mocks/restaurants";
import { buildMapsHref } from "@/utils/restaurant";

type RestaurantCardProps = {
  restaurant: RestaurantItem;
};

export default function RestaurantCard({
  restaurant: { id, name, location, hours, href, image, mapUrl },
}: RestaurantCardProps) {
  const t = useTranslations("Restaurants");
  const tProfile = useTranslations("RestaurantProfile");

  return (
    <article className="@container relative overflow-hidden rounded-xl bg-background shadow-md transition-shadow hover:shadow-lg has-focus-visible:ring-2 has-focus-visible:ring-accent">
      <div className="relative aspect-2/1 w-full sm:aspect-video">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-3 px-4 pb-4 pt-4 sm:gap-4 sm:pt-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-hero text-base font-semibold text-charcoal">
              {name}
            </h3>
            <p className="text-sm text-subtle">{t(`items.${id}`)}</p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-0.5 text-accent">
            <span className="text-xs font-medium">{t("openingHours")}</span>
            <span className="text-[10px]">
              {t("days")} {hours}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-3 sm:gap-4 sm:pt-4">
          <p className="flex items-center gap-2 text-sm font-medium text-charcoal">
            <FiMapPin size={14} aria-hidden className="shrink-0 text-sun" />
            {location}
          </p>

          <div className="grid gap-2 @sm:grid-cols-2 @sm:gap-3">
            <Link
              href={href}
              aria-label={t("viewMenuLabel", { name })}
              className="group flex min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-accent/30 bg-accent-soft px-4 py-2.5 text-sm font-semibold text-ink transition-colors after:absolute after:inset-0 hover:border-accent/60 sm:py-3"
            >
              {t("viewMenu")}
              <FiArrowRight
                size={14}
                aria-hidden
                className="text-accent transition-transform group-hover:translate-x-0.5"
              />
            </Link>

            <Button
              variant="accent"
              href={buildMapsHref({ name, location, mapUrl })}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tProfile("map.label", { name })}
              className="group relative z-10 w-full min-w-0 whitespace-nowrap shadow-md"
            >
              <FiNavigation
                size={16}
                aria-hidden
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              {tProfile("map.cta")}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}