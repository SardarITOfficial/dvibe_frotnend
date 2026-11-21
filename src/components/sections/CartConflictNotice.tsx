"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";

type CartConflictNoticeProps = {
  restaurantId: string;
};

export default function CartConflictNotice({
  restaurantId,
}: CartConflictNoticeProps) {
  const t = useTranslations("RestaurantProfile");
  const { isOtherRestaurantCart, clear } = useCart();

  if (!isOtherRestaurantCart(restaurantId)) return null;

  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-xl border border-border bg-cream p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-charcoal">{t("cart.otherRestaurant")}</p>
      <div className="flex gap-3">
        <Button variant="accent" size="sm" type="button" onClick={clear}>
          {t("cart.clearAndStart")}
        </Button>
        <Button variant="accent" size="sm" href="/cart">
          {t("cart.viewCart")}
        </Button>
      </div>
    </div>
  );
}