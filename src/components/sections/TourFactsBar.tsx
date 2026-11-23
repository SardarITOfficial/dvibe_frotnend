import { useTranslations } from "next-intl";
import { FiGlobe, FiShield, FiTruck, FiUserCheck } from "react-icons/fi";

import type { Tour } from "@/mocks/tours";

type Fact = {
  Icon: typeof FiGlobe;
  text: string;
};

type TourFactsBarProps = {
  tour: Tour;
};

export default function TourFactsBar({ tour }: TourFactsBarProps) {
  const t = useTranslations("Tours.facts");

  const facts: Fact[] = [];

  if (tour.languages?.length) {
    facts.push({
      Icon: FiGlobe,
      text: `${t("languages")}: ${tour.languages
        .map((language) => language.toUpperCase())
        .join(", ")}`,
    });
  }
  if (tour.pickupIncluded) {
    facts.push({ Icon: FiTruck, text: t("pickup") });
  }
  if (tour.wheelchairAccessible) {
    facts.push({ Icon: FiUserCheck, text: t("accessible") });
  }
  if (tour.freeCancellationHours) {
    facts.push({
      Icon: FiShield,
      text: t("freeCancellation", { hours: tour.freeCancellationHours }),
    });
  }

  if (facts.length === 0) return null;

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {facts.map(({ Icon, text }) => (
        <li
          key={text}
          className="flex items-center gap-3 rounded-xl border border-border bg-background p-4"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
            <Icon size={18} aria-hidden />
          </span>
          <span className="text-sm font-medium text-charcoal">{text}</span>
        </li>
      ))}
    </ul>
  );
}