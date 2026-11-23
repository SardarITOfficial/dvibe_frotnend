import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import ToursHero from "@/components/sections/ToursHero";
import ToursSection from "@/components/sections/ToursSection";
import { buildMetadata } from "@/lib/i18n/metadata";

type ToursPageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({
  params,
}: ToursPageProps): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({ locale, path: "/tours" });
}

export default async function ToursPage({ params }: ToursPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <ToursHero />
      <ToursSection />
    </main>
  );
}