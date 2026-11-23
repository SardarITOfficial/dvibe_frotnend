import { useTranslations } from "next-intl";
import { FiChevronDown } from "react-icons/fi";

import SectionCard from "@/components/common/SectionCard";

type TourFaqProps = {
  tourId: string;
  keys?: string[];
};

export default function TourFaq({ tourId, keys }: TourFaqProps) {
  const t = useTranslations("Tours");

  if (!keys?.length) return null;

  return (
    <SectionCard title={t("sections.faq")}>
      <div className="flex flex-col gap-3">
        {keys.map((key) => (
          <details
            key={key}
            className="group rounded-xl border border-border bg-section-bg px-5 py-4"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-charcoal [&::-webkit-details-marker]:hidden">
              {t(`items.${tourId}.faq.${key}.question`)}
              <FiChevronDown
                size={18}
                aria-hidden
                className="shrink-0 text-accent transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {t(`items.${tourId}.faq.${key}.answer`)}
            </p>
          </details>
        ))}
      </div>
    </SectionCard>
  );
}