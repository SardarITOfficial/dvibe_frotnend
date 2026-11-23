import { useTranslations } from "next-intl";

import type { Tour } from "@/mocks/tours";
import TourFaq from "./TourFaq";
import TourItinerary from "./TourItinerary";
import TourListSection from "./TourListSection";
import TourRatings from "./TourRatings";

type TourExtraDetailsProps = {
  tour: Tour;
};

export default function TourExtraDetails({ tour }: TourExtraDetailsProps) {
  const t = useTranslations("Tours.sections");

  return (
    <>
      <TourItinerary tourId={tour.id} stops={tour.itinerary} />
      <TourListSection
        group="notIncluded"
        title={t("notIncluded")}
        keys={tour.notIncluded}
      />
      <TourListSection group="bring" title={t("bring")} keys={tour.bring} />
      <TourListSection
        group="knowBeforeYouGo"
        title={t("knowBeforeYouGo")}
        keys={tour.knowBeforeYouGo}
      />
      <TourRatings tour={tour} />
      <TourFaq tourId={tour.id} keys={tour.faq} />
    </>
  );
}