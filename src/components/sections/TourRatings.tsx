import { useTranslations } from "next-intl";
import { FiStar } from "react-icons/fi";

import SectionCard from "@/components/common/SectionCard";
import type { Tour, TourRatingBreakdown } from "@/mocks/tours";

const RATING_KEYS: (keyof TourRatingBreakdown)[] = [
  "guide",
  "transportation",
  "valueForMoney",
];
const STARS = [1, 2, 3, 4, 5];

type TourRatingsProps = {
  tour: Tour;
};

export default function TourRatings({
  tour: { rating, reviewCount, ratingBreakdown },
}: TourRatingsProps) {
  const t = useTranslations("Tours");

  if (!rating || !reviewCount) return null;

  return (
    <SectionCard title={t("sections.ratings")}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex shrink-0 flex-col items-center gap-1 rounded-xl bg-section-bg px-8 py-5 text-center">
          <p className="font-hero text-5xl font-bold text-accent">
            {rating.toFixed(1)}
          </p>
          <p className="flex gap-0.5 text-sun">
            {STARS.map((star) => (
              <FiStar
                key={star}
                size={16}
                aria-hidden
                fill={star <= Math.round(rating) ? "currentColor" : "none"}
              />
            ))}
          </p>
          <p className="text-xs text-muted">
            {t("rating.basedOn", { count: reviewCount })}
          </p>
        </div>

        {ratingBreakdown && (
          <ul className="flex flex-1 flex-col gap-4">
            {RATING_KEYS.map((key) => {
              const value = ratingBreakdown[key];

              return (
                <li key={key} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-charcoal">
                      {t(`rating.${key}`)}
                    </span>
                    <span className="text-muted">{value.toFixed(1)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-accent-soft">
                    <div
                      className="h-2 rounded-full bg-accent"
                      style={{ width: `${(value / 5) * 100}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </SectionCard>
  );
}