import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiArrowRight, FiMapPin } from "react-icons/fi";

import { Link } from "@/lib/i18n/navigation";
import type { RestaurantItem } from "@/mocks/restaurants";

type RestaurantCardProps = {
  restaurant: RestaurantItem;
};

export default function RestaurantCard({
  restaurant: { id, name, location, hours, href, image },
}: RestaurantCardProps) {
  const t = useTranslations("Restaurants");

  return (
    <article className="relative overflow-hidden rounded-xl bg-background shadow-md transition-shadow hover:shadow-lg has-focus-visible:ring-2 has-focus-visible:ring-accent">
      <div className="relative aspect-video w-full">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 px-4 pb-4 pt-5">
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

        <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
          <p className="flex items-center gap-2 text-sm font-medium text-charcoal">
            <FiMapPin size={14} aria-hidden className="shrink-0 text-sun" />
            {location}
          </p>

          <Link
            href={href}
            aria-label={t("viewMenuLabel", { name })}
            className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-sun transition-opacity after:absolute after:inset-0 hover:opacity-80"
          >
            {t("viewMenu")}
            <FiArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}