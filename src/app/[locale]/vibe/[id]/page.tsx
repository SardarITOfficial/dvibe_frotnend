import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import VibeDetails from "@/components/sections/VibeDetails";
import { buildMetadata } from "@/lib/i18n/metadata";
import { VIBE_EVENTS } from "@/mocks/vibeEvents";
import { getVibeEventById } from "@/utils/vibe";

type VibeDetailsPageProps = Readonly<{
  params: Promise<{ locale: string; id: string }>;
}>;

export async function generateMetadata({
  params,
}: VibeDetailsPageProps): Promise<Metadata> {
  const { locale, id } = await params;

  return buildMetadata({ locale, path: `/vibe/${id}` });
}

export default async function VibeDetailsPage({
  params,
}: VibeDetailsPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const event = getVibeEventById(VIBE_EVENTS, id);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <VibeDetails event={event} />
    </main>
  );
}