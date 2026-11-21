import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiMapPin, FiStar } from "react-icons/fi";

import RestaurantLogo from "@/components/sections/RestaurantLogo";
import RestaurantOpenStatus from "@/components/sections/RestaurantOpenStatus";
import { Button } from "@/components/ui/Button";
import type { RestaurantItem } from "@/mocks/restaurants";
import { buildWhatsAppHref } from "@/utils/whatsapp";

type RestaurantProfileHeaderProps = {
  restaurant: RestaurantItem;
  whatsapp: string;
};

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
      <section className="relative h-64 sm:h-72 lg:h-96">
        <Image
          src={cover ?? image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-charcoal/50 to-charcoal/10"
          aria-hidden
        />
      </section>

      <section className="flow-root bg-section-bg pb-10 font-hero lg:pb-12">
        <div className="container mx-auto px-4">
          <div className="relative z-10 -mt-14 flex flex-col gap-5 rounded-2xl border border-border bg-background p-5 shadow-md sm:p-6 lg:-mt-20 lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-center gap-4">
                <RestaurantLogo name={name} logo={logo} />
                <div className="flex min-w-0 flex-col gap-1">
                  <h1 className="text-2xl font-bold text-charcoal sm:text-3xl lg:text-4xl">
                    {name}
                  </h1>
                  <p className="text-sm text-subtle sm:text-base">
                    {tRestaurants(`items.${id}`)}
                  </p>
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

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-charcoal">
              <li className="flex items-center gap-1.5">
                <FiStar
                  size={16}
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
              </li>
              <li>
                <RestaurantOpenStatus hours={hours} />
              </li>
              <li className="flex items-center gap-2">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <FiMapPin size={16} aria-hidden />
                </span>
                {location}
              </li>
              <li className="flex items-center gap-2">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <FiClock size={16} aria-hidden />
                </span>
                {tRestaurants("days")} {hours}
              </li>
            </ul>

            <p className="max-w-3xl text-base leading-relaxed text-muted">
              {tRestaurants(`descriptions.${id}`)}
            </p>

            <ul className="flex flex-wrap gap-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="rounded-full bg-accent-soft px-5 py-2 text-sm font-medium text-ink"
                >
                  {t(`services.${service}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}