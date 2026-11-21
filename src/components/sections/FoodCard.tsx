"use client";

import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { FiImage, FiShoppingCart } from "react-icons/fi";

import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { useCart } from "@/hooks/useCart";
import { MAX_LINE_QUANTITY } from "@/state/redux/slices/cartSlice";
import type { MenuItem } from "@/types";

type FoodCardProps = {
  item: MenuItem;
  restaurantId: string;
};

export default function FoodCard({
  item: { id, name, description, price, image, isAvailable },
  restaurantId,
}: FoodCardProps) {
  const t = useTranslations("RestaurantProfile");
  const format = useFormatter();
  const { getQuantity, isOtherRestaurantCart, add, updateQuantity } = useCart();

  const quantity = getQuantity(id);
  const canAdd = isAvailable && !isOtherRestaurantCart(restaurantId);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-accent-soft">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={[
              "object-cover transition-transform duration-300 group-hover:scale-105",
              !isAvailable && "grayscale",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        ) : (
          <div
            aria-hidden
            className="flex size-full items-center justify-center text-accent/40"
          >
            <FiImage size={40} />
          </div>
        )}

        <span className="absolute right-3 top-3 rounded-full bg-background/95 px-3 py-1 font-hero text-sm font-bold text-accent shadow-sm">
          {t("price", { amount: format.number(price) })}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <div className="flex flex-col gap-1.5">
          <h4 className="font-hero text-lg font-semibold text-charcoal">
            {name}
          </h4>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">
            {description}
          </p>
        </div>

        {quantity > 0 ? (
          <QuantityStepper
            quantity={quantity}
            max={MAX_LINE_QUANTITY}
            decreaseLabel={t("cart.decreaseLabel", { dish: name })}
            increaseLabel={t("cart.increaseLabel", { dish: name })}
            onChange={(next) => updateQuantity(id, next)}
            className="self-start"
          />
        ) : (
          <Button
            variant="accent"
            size="sm"
            type="button"
            disabled={!canAdd}
            aria-label={t("cart.addLabel", { dish: name })}
            onClick={() => add(restaurantId, id)}
            className="w-full"
          >
            <FiShoppingCart size={14} aria-hidden />
            {t(isAvailable ? "cart.add" : "cart.unavailable")}
          </Button>
        )}
      </div>
    </article>
  );
}