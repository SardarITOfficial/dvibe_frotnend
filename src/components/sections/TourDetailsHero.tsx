import { useFormatter, useTranslations } from "next-intl";
import { FiClock, FiMapPin, FiStar } from "react-icons/fi";

import PageHero from "@/components/common/PageHero";
import type { Tour } from "@/mocks/tours";

const CHIP_CLASSES =
  "inline-flex items-center gap-2 rounded-full border-[0.5px] border-stroke bg-background/5 px-4 py-2 text-sm font-medium text-background backdrop-blur-md";

type TourDetailsHeroProps = {
  tour: Tour;
};

export default function TourDetailsHero({
  tour: { id, image, location, durationHours, rating, reviewCount },
}: TourDetailsHeroProps) {
  const t = useTranslations("Tours");
  const format = useFormatter();

  return (
    <PageHero
      id="tour-details-heading"
      eyebrow={t("eyebrow")}
      title={t(`items.${id}.name`)}
      image={image}
    >
      <ul className="mt-2 flex flex-wrap gap-3">
        <li className={CHIP_CLASSES}>
          <FiMapPin size={16} aria-hidden className="text-sun" />
          {location}
        </li>
        <li className={CHIP_CLASSES}>
          <FiClock size={16} aria-hidden className="text-sun" />
          {t("duration", { hours: durationHours })}
        </li>
        {rating && reviewCount ? (
          <li className={CHIP_CLASSES}>
            <FiStar
              size={16}
              fill="currentColor"
              aria-hidden
              className="text-sun"
            />
            {format.number(rating, {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}{" "}
            ({reviewCount})
          </li>
        ) : null}
      </ul>
    </PageHero>
  );
}