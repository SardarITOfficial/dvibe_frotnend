import { useTranslations } from "next-intl";
import { FiExternalLink, FiMapPin } from "react-icons/fi";

import SectionCard from "@/components/common/SectionCard";
import { Button } from "@/components/ui/Button";
import type { TourMeetingPoint as TourMeetingPointData } from "@/mocks/tours";

type TourMeetingPointProps = {
  meetingPoint: TourMeetingPointData;
};

export default function TourMeetingPoint({
  meetingPoint: { name, address, mapUrl },
}: TourMeetingPointProps) {
  const t = useTranslations("Tours");

  return (
    <SectionCard title={t("details.meetingPoint")}>
      <div className="flex items-start gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
          <FiMapPin size={18} aria-hidden />
        </span>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-charcoal">{name}</p>
          <p className="text-sm text-muted">{address}</p>
        </div>
      </div>
      <Button
        variant="outline"
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-fit"
      >
        <FiExternalLink size={16} aria-hidden />
        {t("details.openMap")}
      </Button>
    </SectionCard>
  );
}