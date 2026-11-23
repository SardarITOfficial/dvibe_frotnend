import { useTranslations } from "next-intl";

import PageHero from "@/components/common/PageHero";

export default function ToursHero() {
  const t = useTranslations("Tours");

  return (
    <PageHero
      id="tours-page-heading"
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
    />
  );
}