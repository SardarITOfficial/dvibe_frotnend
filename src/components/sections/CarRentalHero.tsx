import { useTranslations } from "next-intl";

import PageHero from "@/components/common/PageHero";

export default function CarRentalHero() {
  const t = useTranslations("CarRental");

  return (
    <PageHero
      id="car-rental-page-heading"
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
    />
  );
}