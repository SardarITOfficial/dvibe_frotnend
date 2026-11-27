import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiShoppingBag,
  FiStar,
  FiNavigation
} from "react-icons/fi";

import RestaurantLogo from "@/components/sections/RestaurantLogo";
import RestaurantOpenStatus from "@/components/sections/RestaurantOpenStatus";
import { Button } from "@/components/ui/Button";
import type { RestaurantItem, RestaurantService } from "@/mocks/restaurants";
import { buildWhatsAppHref } from "@/utils/whatsapp";
import { buildMapsHref } from "@/utils/restaurant";
type RestaurantProfileHeaderProps = {
  restaurant: RestaurantItem;
  whatsapp: string;
};

const SERVICE_ICONS = {
  takeaway: FiShoppingBag,
  reservation: FiCalendar,
} satisfies Record<RestaurantService, typeof FiShoppingBag>;

export default function RestaurantProfileHeader({
  restaurant: {
    id,
    name,
    location,
    hours,
    image,
    cover,
    logo,
    rating,
    reviewCount,
    services,
    mapUrl
  },
  whatsapp,
}: RestaurantProfileHeaderProps) {
  const t = useTranslations("RestaurantProfile");
  const tRestaurants = useTranslations("Restaurants");
  const format = useFormatter();

  const reserveHref = buildWhatsAppHref(
    whatsapp,
    t("reserve.message", { restaurant: name }),
  );

  return (
    <>
      <section className="relative h-60 sm:h-80 lg:h-105">
        <Image
          src={cover ?? image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-charcoal/70 via-charcoal/20 to-charcoal/10"
          aria-hidden
        />
      </section>

      <section className="flow-root bg-section-bg pb-10 font-hero lg:pb-12">
        <div className="container mx-auto px-4">
          <div className="relative z-10 -mt-16 flex flex-col gap-6 rounded-2xl border border-border bg-background p-5 shadow-md sm:p-6 lg:-mt-24 lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4 sm:gap-5">
                <RestaurantLogo name={name} logo={logo} />
                <div className="flex min-w-0 flex-col gap-2">
                  <div className="flex flex-col gap-0.5">
                    <h1 className="text-2xl font-bold leading-tight text-charcoal sm:text-3xl lg:text-4xl">
                      {name}
                    </h1>
                    <p className="text-sm text-subtle sm:text-base">
                      {tRestaurants(`items.${id}`)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-xs font-semibold text-charcoal">
                      <FiStar
                        size={14}
                        fill="currentColor"
                        aria-hidden
                        className="text-sun"
                      />
                      {t("rating", {
                        rating: format.number(rating, {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        }),
                        count: reviewCount,
                      })}
                    </span>
                    <RestaurantOpenStatus hours={hours} />
                  </div>
                </div>
              </div>

              {services.includes("reservation") && (
                <Button
                  variant="accent"
                  href={reserveHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("reserve.label", { restaurant: name })}
                  className="w-full lg:w-auto"
                >
                  <FaWhatsapp size={18} aria-hidden />
                  {t("reserve.cta")}
                </Button>
              )}
            </div>

            <ul className="grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
              <li className="flex items-center gap-3 rounded-xl bg-section-bg p-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <FiMapPin size={18} aria-hidden />
                </span>
                <span className="text-sm font-medium text-charcoal">
                  {location}
                </span>
              </li>
              <li className="flex items-center gap-3 rounded-xl bg-section-bg p-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <FiClock size={18} aria-hidden />
                </span>
                <span className="text-sm font-medium text-charcoal">
                  {tRestaurants("days")} {hours}
                </span>
              </li>
            </ul>

            <p className="max-w-3xl text-base leading-relaxed text-muted">
              {tRestaurants(`descriptions.${id}`)}
            </p>

            <ul className="flex flex-wrap gap-3">
              {services.map((service) => {
                const Icon = SERVICE_ICONS[service];

                return (
                  <li
                    key={service}
                    className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-medium text-ink"
                  >
                    <Icon size={14} aria-hidden className="text-accent" />
                    {t(`services.${service}`)}
                  </li>
                );
              })}
            </ul>
            <Button
              variant="accent"
              href={buildMapsHref({ name, location, mapUrl })}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("map.label", { name })}
              className="w-full sm:w-auto sm:self-start"
            >
              <FiNavigation size={16} aria-hidden />
              {t("map.cta")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
