import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import BeachesHero from "@/components/sections/BeachesHero";
import BeachesSection from "@/components/sections/BeachesSection";
import { buildMetadata } from "@/lib/i18n/metadata";

type BeachesPageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({
  params,
}: BeachesPageProps): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({ locale, path: "/beaches" });
}

export default async function BeachesPage({ params }: BeachesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <BeachesHero />
      <BeachesSection />
    </main>
  );
}