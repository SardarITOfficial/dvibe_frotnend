import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { FiImage, FiTrash2 } from "react-icons/fi";

import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { MAX_LINE_QUANTITY } from "@/state/redux/slices/cartSlice";
import type { MenuItem } from "@/types";

type CartLineItemProps = {
  item: MenuItem;
  quantity: number;
  lineTotal: number;
  onQuantityChange: (quantity: number) => void;
};

export default function CartLineItem({
  item: { name, price, image },
  quantity,
  lineTotal,
  onQuantityChange,
}: CartLineItemProps) {
  const t = useTranslations("Cart");
  const format = useFormatter();

  const formatPrice = (amount: number) =>
    t("price", { amount: format.number(amount) });

  return (
    <li className="flex gap-4 p-4 sm:gap-5 sm:p-5">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-accent-soft sm:size-28">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="flex size-full items-center justify-center text-accent/40"
          >
            <FiImage size={28} />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-0.5">
            <h2 className="truncate text-base font-semibold text-charcoal">
              {name}
            </h2>
            <p className="text-sm text-muted">{formatPrice(price)}</p>
          </div>
          <button
            type="button"
            aria-label={t("removeLabel", { dish: name })}
            onClick={() => onQuantityChange(0)}
            className="shrink-0 rounded-full p-2 text-muted transition-colors hover:bg-accent-soft hover:text-danger"
          >
            <FiTrash2 size={16} aria-hidden />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <QuantityStepper
            quantity={quantity}
            max={MAX_LINE_QUANTITY}
            decreaseLabel={t("decreaseLabel", { dish: name })}
            increaseLabel={t("increaseLabel", { dish: name })}
            onChange={onQuantityChange}
          />
          <p className="text-lg font-bold text-sun">{formatPrice(lineTotal)}</p>
        </div>
      </div>
    </li>
  );
}
