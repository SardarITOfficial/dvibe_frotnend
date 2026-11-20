import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import CategoriesSection from "@/components/sections/CategoriesSection";
import HeroSection from "@/components/sections/HeroSection";
import { buildMetadata } from "@/lib/i18n/metadata";
import FlavoursSection from "@/components/sections/FlavoursSection";
import RestaurantsSection from "@/components/sections/RestaurantsSection";
import VibeSection from "@/components/sections/VibeSection";
type HomeProps = Readonly<{ params: Promise<{ locale: string }> }>;

export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({ locale, path: "/" });
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
<main className="min-h-screen">
  <HeroSection />
  <CategoriesSection />
  <FlavoursSection />
  <RestaurantsSection />
  <VibeSection />
</main>
  );
}