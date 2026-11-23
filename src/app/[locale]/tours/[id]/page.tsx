import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import TourDetails from "@/components/sections/TourDetails";
import { buildMetadata } from "@/lib/i18n/metadata";
import { TOURS } from "@/mocks/tours";
import { getTourById } from "@/utils/tour";

type TourDetailsPageProps = Readonly<{
  params: Promise<{ locale: string; id: string }>;
}>;

export async function generateMetadata({
  params,
}: TourDetailsPageProps): Promise<Metadata> {
  const { locale, id } = await params;

  return buildMetadata({ locale, path: `/tours/${id}` });
}

export default async function TourDetailsPage({
  params,
}: TourDetailsPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const tour = getTourById(TOURS, id);

  if (!tour) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <TourDetails tour={tour} />
    </main>
  );
}