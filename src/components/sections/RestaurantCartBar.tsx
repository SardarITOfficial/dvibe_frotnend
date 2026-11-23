"use client";

import { useFormatter, useTranslations } from "next-intl";
import { FiShoppingBag } from "react-icons/fi";

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
      className="pointer-events-none sticky bottom-4 z-40 px-4 pb-4"
    >
      <div className="pointer-events-auto container mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-2xl border border-border bg-background/95 px-4 py-3 font-hero shadow-lg backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
            <FiShoppingBag size={20} aria-hidden />
            <span
              aria-hidden
              className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-sun text-xs font-bold text-charcoal"
            >
              {count}
            </span>
          </span>
          <p className="flex flex-col text-sm text-muted">
            <span>{t("cart.items", { count })}</span>
            <span className="text-lg font-bold text-accent">
              {t("price", { amount: format.number(total) })}
            </span>
          </p>
        </div>
        <Button variant="accent" href="/cart">
          {t("cart.viewCart")}
        </Button>
      </div>
    </div>
  );
}