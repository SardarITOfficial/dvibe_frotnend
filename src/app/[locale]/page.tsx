import { setRequestLocale } from "next-intl/server";

import CategoriesSection from "@/components/sections/CategoriesSection";
import HeroSection from "@/components/sections/HeroSection";

export default async function Home({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
    </main>
  );
}