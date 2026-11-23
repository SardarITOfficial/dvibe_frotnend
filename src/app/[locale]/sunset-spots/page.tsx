import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import SunsetSpotsHero from "@/components/sections/SunsetSpotsHero";
import SunsetSpotsSection from "@/components/sections/SunsetSpotsSection";
import { buildMetadata } from "@/lib/i18n/metadata";

type SunsetSpotsPageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({
  params,
}: SunsetSpotsPageProps): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({ locale, path: "/sunset-spots" });
}

export default async function SunsetSpotsPage({
  params,
}: SunsetSpotsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <SunsetSpotsHero />
      <SunsetSpotsSection />
    </main>
  );
}