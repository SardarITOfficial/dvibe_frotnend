import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import CartView from "@/components/sections/CartView";
import { buildMetadata } from "@/lib/i18n/metadata";

type CartPageProps = Readonly<{ params: Promise<{ locale: string }> }>;

export async function generateMetadata({
  params,
}: CartPageProps): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({ locale, path: "/cart" });
}

export default async function CartPage({ params }: CartPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-section-bg pt-28 lg:pt-44">
      <CartView />
    </main>
  );
}