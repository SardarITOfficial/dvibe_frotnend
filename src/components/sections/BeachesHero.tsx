import { useTranslations } from "next-intl";

import PageHero from "@/components/common/PageHero";

export default function BeachesHero() {
  const t = useTranslations("Beaches");

  return (
    <PageHero
      id="beaches-title"
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
    />
  );
}