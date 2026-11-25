import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import CarRentalHero from "@/components/sections/CarRentalHero";
import CarRentalList from "@/components/sections/CarRentalList";
import { buildMetadata } from "@/lib/i18n/metadata";
import { CAR_RENTALS } from "@/mocks/carRentals";

type CarRentalPageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({
  params,
}: CarRentalPageProps): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({ locale, path: "/car-rental" });
}

export default async function CarRentalPage({ params }: CarRentalPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <CarRentalHero />
      <CarRentalList cars={CAR_RENTALS} />
    </main>
  );
}