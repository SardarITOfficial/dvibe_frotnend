import { useTranslations } from "next-intl";

import PageHero from "@/components/common/PageHero";

export default function SunsetSpotsHero() {
  const t = useTranslations("SunsetSpots");

  return (
    <PageHero
      id="sunset-spots-title"
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
    />
  );
}