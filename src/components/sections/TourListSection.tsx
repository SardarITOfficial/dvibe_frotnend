import { useTranslations } from "next-intl";
import { FiCheck, FiInfo, FiPackage, FiX } from "react-icons/fi";

import SectionCard from "@/components/common/SectionCard";

type TourListGroup = "included" | "notIncluded" | "bring" | "knowBeforeYouGo";

const GROUP_ICONS: Record<
  TourListGroup,
  { Icon: typeof FiCheck; className: string }
> = {
  included: { Icon: FiCheck, className: "bg-success/10 text-success" },
  notIncluded: { Icon: FiX, className: "bg-danger/10 text-danger" },
  bring: { Icon: FiPackage, className: "bg-accent-soft text-accent" },
  knowBeforeYouGo: { Icon: FiInfo, className: "bg-sun/15 text-sun" },
};

type TourListSectionProps = {
  group: TourListGroup;
  title: string;
  keys?: string[];
};

export default function TourListSection({
  group,
  title,
  keys,
}: TourListSectionProps) {
  const t = useTranslations("Tours");

  if (!keys?.length) return null;

  const { Icon, className } = GROUP_ICONS[group];

  return (
    <SectionCard title={title}>
      <ul className="grid gap-3 sm:grid-cols-2">
        {keys.map((key) => (
          <li key={key} className="flex items-start gap-3">
            <span
              className={`flex size-7 shrink-0 items-center justify-center rounded-full ${className}`}
            >
              <Icon size={14} aria-hidden />
            </span>
            <span className="text-base text-charcoal">{t(`${group}.${key}`)}</span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}