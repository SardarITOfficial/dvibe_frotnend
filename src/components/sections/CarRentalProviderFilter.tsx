import { useTranslations } from "next-intl";

import type { CarProvider } from "@/types";
import { ALL_PROVIDERS } from "@/utils/carRental";

type CarRentalProviderFilterProps = {
  providers: CarProvider[];
  selectedId: string;
  onChange: (providerId: string) => void;
};

export default function CarRentalProviderFilter({
  providers,
  selectedId,
  onChange,
}: CarRentalProviderFilterProps) {
  const t = useTranslations("CarRental.cars.filter");

  if (providers.length < 2) return null;

  const options = [
    { id: ALL_PROVIDERS, label: t("all") },
    ...providers.map(({ id, name }) => ({ id, label: name })),
  ];

  return (
    <div role="group" aria-label={t("label")} className="flex flex-wrap gap-2">
      {options.map(({ id, label }) => {
        const isSelected = id === selectedId;

        return (
          <button
            key={id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isSelected
                ? "border-charcoal bg-charcoal text-background"
                : "border-stroke/40 bg-background text-charcoal hover:bg-section-bg"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}