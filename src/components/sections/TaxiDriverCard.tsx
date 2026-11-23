import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { FaStar } from "react-icons/fa";
import { FiClock, FiMapPin } from "react-icons/fi";

import { Button } from "@/components/ui/Button";
import type { TaxiDriver } from "@/mocks/taxiDrivers";

type TaxiDriverCardProps = {
  driver: TaxiDriver;
  onSelect: (driver: TaxiDriver) => void;
};

export default function TaxiDriverCard({
  driver,
  onSelect,
}: TaxiDriverCardProps) {
  const t = useTranslations("Taxi.drivers");
  const tArea = useTranslations("Hero.locations");
  const format = useFormatter();

  const {
    name,
    vehicle,
    area,
    photo,
    carImage,
    rating,
    reviewCount,
    etaMinutes,
    isAvailable,
  } = driver;

  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-stroke/40 bg-background shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative h-44 overflow-hidden bg-section-bg">
        <Image
          src={carImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className={`object-cover object-center ${isAvailable ? "" : "opacity-60 grayscale"}`}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-charcoal/40 via-transparent to-charcoal/10"
        />
        <p className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-background px-3 py-1 text-xs font-medium text-charcoal shadow-sm">
          <span
            aria-hidden
            className={`size-2 rounded-full ${isAvailable ? "bg-success" : "bg-muted"}`}
          />
          {t(isAvailable ? "status.available" : "status.unavailable")}
        </p>
        {isAvailable && (
          <p className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-background px-3 py-1 text-xs font-medium text-accent shadow-sm">
            <FiClock size={12} aria-hidden />
            {t("eta", { minutes: etaMinutes })}
          </p>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 px-5 pb-5">
        <span className="relative -mt-8 flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-soft text-xl font-bold text-accent ring-4 ring-background">
          {photo ? (
            <Image
              src={photo}
              alt=""
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <span aria-hidden>{name.charAt(0)}</span>
          )}
        </span>

        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="truncate text-lg font-semibold text-charcoal">
            {name}
          </h3>
          <p className="truncate text-sm text-muted">{vehicle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex items-center gap-1.5 text-sm font-medium text-charcoal">
            <FaStar size={14} aria-hidden className="text-sun" />
            {t("rating", {
              rating: format.number(rating, {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }),
              count: reviewCount,
            })}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
            <FiMapPin size={12} aria-hidden />
            {tArea(area)}
          </span>
        </div>

        <Button
          type="button"
          variant="accent"
          disabled={!isAvailable}
          aria-label={t("selectLabel", { driver: name })}
          onClick={() => onSelect(driver)}
          className="mt-auto w-full disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50"
        >
          {t("select")}
        </Button>
      </div>
    </li>
  );
}
