import { useTranslations } from "next-intl";
import { FiArrowLeft } from "react-icons/fi";

import SectionCard from "@/components/common/SectionCard";
import { Link } from "@/lib/i18n/navigation";
import type { Tour } from "@/mocks/tours";
import TourBooking from "./TourBooking";
import TourDetailsHero from "./TourDetailsHero";
import TourExtraDetails from "./TourExtraDetails";
import TourFactsBar from "./TourFactsBar";
import TourGallery from "./TourGallery";
import TourHighlights from "./TourHighlights";
import TourListSection from "./TourListSection";
import TourMeetingPoint from "./TourMeetingPoint";

type TourDetailsProps = {
  tour: Tour;
};

export default function TourDetails({ tour }: TourDetailsProps) {
  const t = useTranslations("Tours");

  return (
    <>
      <TourDetailsHero tour={tour} />

      <section className="bg-section-bg py-10 font-hero lg:py-14">
        <div className="container mx-auto flex flex-col gap-8 px-4">
          <Link
            href="/tours"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            <FiArrowLeft size={16} aria-hidden />
            {t("details.back")}
          </Link>

          <TourGallery tourId={tour.id} images={tour.gallery} />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
            <div className="flex flex-col gap-6">
              <TourFactsBar tour={tour} />

              <SectionCard title={t("details.about")}>
                <p className="text-base leading-relaxed text-muted">
                  {t(`items.${tour.id}.description`)}
                </p>
              </SectionCard>

              <TourHighlights tourId={tour.id} keys={tour.highlights} />
              <TourListSection
                group="included"
                title={t("details.included")}
                keys={tour.included}
              />
              <TourExtraDetails tour={tour} />
              <TourMeetingPoint meetingPoint={tour.meetingPoint} />
            </div>

            <aside className="lg:sticky lg:top-24">
              <TourBooking tour={tour} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}