import { useTranslations } from "next-intl";
import { FiAward } from "react-icons/fi";

import SectionCard from "@/components/common/SectionCard";

type TourHighlightsProps = {
  tourId: string;
  keys: string[];
};

export default function TourHighlights({ tourId, keys }: TourHighlightsProps) {
  const t = useTranslations("Tours");

  if (keys.length === 0) return null;

  return (
    <SectionCard title={t("details.highlights")}>
      <ul className="grid gap-4 sm:grid-cols-2">
        {keys.map((key) => (
          <li key={key} className="flex gap-4 rounded-xl bg-section-bg p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
              <FiAward size={18} aria-hidden />
            </span>
            <div className="flex min-w-0 flex-col gap-1">
              <h3 className="font-semibold text-charcoal">
                {t(`items.${tourId}.highlights.${key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {t(`items.${tourId}.highlights.${key}.description`)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}