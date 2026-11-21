import { useTranslations } from "next-intl";
import { FiMapPin } from "react-icons/fi";

import { Button } from "@/components/ui/Button";
import type { VibeVenue as VibeVenueData } from "@/mocks/vibeEvents";

type VibeVenueProps = {
  venue: VibeVenueData;
};

export default function VibeVenue({
  venue: { name, address, mapUrl },
}: VibeVenueProps) {
  const t = useTranslations("Vibe.details.venue");

  return (
    <section
      aria-labelledby="vibe-venue-heading"
      className="flex flex-col gap-4"
    >
      <h2
        id="vibe-venue-heading"
        className="font-hero text-2xl font-bold text-accent"
      >
        {t("title")}
      </h2>
      <div className="flex flex-col gap-4 rounded-xl bg-background p-5 shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <FiMapPin
            size={18}
            aria-hidden
            className="mt-0.5 shrink-0 text-sun"
          />
          <div className="flex flex-col gap-0.5">
            <p className="text-base font-semibold text-charcoal">{name}</p>
            <p className="text-sm text-muted">{address}</p>
          </div>
        </div>
        <Button
          variant="soft"
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("openMap")}
        </Button>
      </div>
    </section>
  );
}