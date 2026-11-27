import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import type { CarRental } from "@/types";

type CarRentalCardProps = {
  car: CarRental;
  onSelect: (car: CarRental) => void;
};

export default function CarRentalCard({ car, onSelect }: CarRentalCardProps) {
  const t = useTranslations("CarRental.cars");
  const format = useFormatter();

  const {
    name,
    category,
    seats,
    transmission,
    pricePerDay,
    image,
    isAvailable,
    provider,
  } = car;

  const specs = [
    { key: "seats", value: format.number(seats) },
    { key: "transmission", value: t(`transmission.${transmission}`) },
    {
      key: "price",
      value: format.number(pricePerDay, {
        style: "currency",
        currency: "CVE",
        maximumFractionDigits: 0,
      }),
    },
  ];

  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-stroke/40 bg-background shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative h-56 w-full overflow-hidden bg-section-bg sm:h-60">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className={`object-cover object-center ${isAvailable ? "" : "opacity-60 grayscale"}`}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-charcoal/80 via-charcoal/30 to-transparent"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5">
          <div className="flex min-w-0 flex-col gap-0.5">
            <h3 className="truncate text-xl font-bold text-background">
              {name}
            </h3>
            <p className="truncate text-sm text-background/80">
              {t(`categories.${category}`)}
            </p>
          </div>
          <p className="flex shrink-0 items-center gap-1.5 rounded-full bg-background px-3 py-1 text-xs font-medium text-charcoal shadow-sm">
            <span
              aria-hidden
              className={`size-2 rounded-full ${isAvailable ? "bg-success" : "bg-muted"}`}
            />
            {t(isAvailable ? "status.available" : "status.unavailable")}
          </p>
        </div>
      </div>

      <dl className="mx-5 mt-5 grid grid-cols-3 gap-2 rounded-xl bg-section-bg p-4">
        {specs.map(({ key, value }) => (
          <div key={key} className="flex min-w-0 flex-col gap-1">
            <dt className="truncate text-xs text-muted">{t(`specs.${key}`)}</dt>
            <dd className="text-sm font-bold text-charcoal">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mx-5 mt-4 truncate text-sm text-muted">
        {t("provider", { provider: provider.name })}
      </p>
      <div className="mt-auto p-5">
        <Button
          type="button"
          variant="accent"
          disabled={!isAvailable}
          aria-label={t("selectLabel", { car: name })}
          onClick={() => onSelect(car)}
          className="w-full disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50"
        >
          {t("select")}
        </Button>
      </div>
    </li>
  );
}
