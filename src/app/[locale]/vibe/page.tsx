import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import VibeEventsSection from "@/components/sections/VibeEventsSection";
import VibeHero from "@/components/sections/VibeHero";
import { buildMetadata } from "@/lib/i18n/metadata";
import { parseVibeFilter } from "@/utils/vibe";

type VibePageProps = Readonly<{
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string | string[] }>;
}>;

export async function generateMetadata({
  params,
}: VibePageProps): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({ locale, path: "/vibe" });
}

export default async function VibePage({
  params,
  searchParams,
}: VibePageProps) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <VibeHero />
      <VibeEventsSection filter={parseVibeFilter(category)} />
    </main>
  );
}