"use client";

import { useFormatter, useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import type { MenuCategory } from "@/types";
import { getCartTotal, getPricedLines } from "@/utils/cart";

type RestaurantCartBarProps = {
  restaurantId: string;
  categories: MenuCategory[];
};

export default function RestaurantCartBar({
  restaurantId,
  categories,
}: RestaurantCartBarProps) {
  const t = useTranslations("RestaurantProfile");
  const format = useFormatter();
  const { cart } = useCart();

  if (cart.restaurantId !== restaurantId) return null;

  const priced = getPricedLines(cart.lines, categories);

  if (priced.length === 0) return null;

  const count = priced.reduce((sum, line) => sum + line.quantity, 0);
  const total = getCartTotal(priced);

  return (
    <div
      role="region"
      aria-label={t("cart.summaryLabel")}
      className="sticky bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur"
    >
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 font-hero">
        <p className="flex flex-col text-sm text-muted">
          <span>{t("cart.items", { count })}</span>
          <span className="text-lg font-bold text-accent">
            {t("price", { amount: format.number(total) })}
          </span>
        </p>
        <Button variant="accent" href="/cart">
          {t("cart.viewCart")}
        </Button>
      </div>
    </div>
  );
}