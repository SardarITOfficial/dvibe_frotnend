import { useTranslations } from "next-intl";

import PageHero from "@/components/common/PageHero";

export default function VibeHero() {
  const t = useTranslations("Vibe");

  return (
    <PageHero
      id="vibe-page-heading"
      eyebrow={t("eyebrow")}
      title={t("page.title")}
      description={t("page.description")}
    />
  );
}