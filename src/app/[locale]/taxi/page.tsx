import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import TaxiDriverList from "@/components/sections/TaxiDriverList";
import TaxiHero from "@/components/sections/TaxiHero";
import { buildMetadata } from "@/lib/i18n/metadata";
import { TAXI_DRIVERS } from "@/mocks/taxiDrivers";

type TaxiPageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({
  params,
}: TaxiPageProps): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({ locale, path: "/taxi" });
}

export default async function TaxiPage({ params }: TaxiPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <TaxiHero />
      <TaxiDriverList drivers={TAXI_DRIVERS} />
    </main>
  );
}