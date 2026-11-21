import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import RestaurantProfile from "@/components/sections/RestaurantProfile";
import { getRestaurant, getRestaurantMenu } from "@/lib/api/restaurants";
import { buildMetadata } from "@/lib/i18n/metadata";

type RestaurantProfilePageProps = Readonly<{
  params: Promise<{ locale: string; id: string }>;
}>;

export async function generateMetadata({
  params,
}: RestaurantProfilePageProps): Promise<Metadata> {
  const { locale, id } = await params;

  return buildMetadata({ locale, path: `/restaurants/${id}` });
}

export default async function RestaurantProfilePage({
  params,
}: RestaurantProfilePageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const [restaurant, menu] = await Promise.all([
    getRestaurant(id),
    getRestaurantMenu(id),
  ]);

  if (!restaurant || !menu) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <RestaurantProfile restaurant={restaurant} menu={menu} />
    </main>
  );
}