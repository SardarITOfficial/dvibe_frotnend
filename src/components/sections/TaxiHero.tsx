import { useTranslations } from "next-intl";

import PageHero from "@/components/common/PageHero";

export default function TaxiHero() {
  const t = useTranslations("Taxi");

  return (
    <PageHero
      id="taxi-page-heading"
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
    />
  );
}