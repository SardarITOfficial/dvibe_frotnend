import { useTranslations } from "next-intl";

import SectionCard from "@/components/common/SectionCard";
import type { TourItineraryStop } from "@/mocks/tours";

type TourItineraryProps = {
  tourId: string;
  stops?: TourItineraryStop[];
};

export default function TourItinerary({ tourId, stops }: TourItineraryProps) {
  const t = useTranslations("Tours");

  if (!stops?.length) return null;

  return (
    <SectionCard title={t("sections.itinerary")}>
      <ol className="ml-4 flex flex-col gap-6 border-l-2 border-accent-soft pl-8">
        {stops.map((stop, index) => (
          <li key={stop.id} className="relative flex flex-col gap-1">
            <span className="absolute -left-12.25 top-0 flex size-8 items-center justify-center rounded-full bg-accent text-sm font-semibold text-background">
              {index + 1}
            </span>
            <h3 className="font-semibold text-charcoal">
              {t(`items.${tourId}.itinerary.${stop.id}.title`)}
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              {t(`items.${tourId}.itinerary.${stop.id}.text`)}
            </p>
          </li>
        ))}
      </ol>
    </SectionCard>
  );
}