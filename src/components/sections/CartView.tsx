"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowLeft, FiMessageSquare, FiPhone, FiUser } from "react-icons/fi";

import CartEmptyState from "@/components/sections/CartEmptyState";
import CartLineItem from "@/components/sections/CartLineItem";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCart } from "@/hooks/useCart";
import { useFormErrors } from "@/hooks/useFormErrors";
import { createOrder } from "@/lib/api/orders";
import { getRestaurant, getRestaurantMenu } from "@/lib/api/restaurants";
import { Link } from "@/lib/i18n/navigation";
import type { RestaurantMenu } from "@/types";
import { getCartTotal, getPricedLines } from "@/utils/cart";
import { buildWhatsAppHref } from "@/utils/whatsapp";
import { isOrderFieldValid } from "@/validations/order.schema";

type LoadedCart = { menu: RestaurantMenu; restaurantName: string };

type CartFieldProps = {
  name: string;
  label: string;
  icon: ReactNode;
  error?: string;
  type?: string;
  autoComplete?: string;
  onChange: () => void;
};

function CartField({
  name,
  label,
  icon,
  error,
  type,
  autoComplete,
  onChange,
}: CartFieldProps) {
  const id = `cart-${name}`;
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-charcoal">
        {label}
      </label>
      <Input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        variant="bare"
        icon={icon}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={onChange}
        wrapperClassName={[
          "h-12 rounded-xl border bg-background px-4 transition-colors focus-within:border-accent",
          error ? "border-danger" : "border-border",
        ].join(" ")}
      />
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-sm font-medium text-danger"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function CartSkeleton({ label }: { label: string }) {
  return (
    <div
      aria-busy
      className="container mx-auto grid gap-8 px-4 pb-16 lg:grid-cols-[1fr_24rem]"
    >
      <p role="status" className="sr-only">
        {label}
      </p>
      <div className="h-72 animate-pulse rounded-2xl bg-accent-soft" />
      <div className="h-96 animate-pulse rounded-2xl bg-accent-soft" />
    </div>
  );
}

export default function CartView() {
  const t = useTranslations("Cart");
  const format = useFormatter();
  const { cart, updateQuantity, clear } = useCart();
  const { errors, setMultipleErrors, setFieldError, clearError } =
    useFormErrors();

  const [loaded, setLoaded] = useState<LoadedCart>();
  const [idempotencyKey] = useState(() => crypto.randomUUID());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { restaurantId } = cart;

  useEffect(() => {
    if (!restaurantId) return;

    let active = true;

    Promise.all([
      getRestaurantMenu(restaurantId),
      getRestaurant(restaurantId),
    ]).then(([menu, restaurant]) => {
      if (active && menu && restaurant) {
        setLoaded({ menu, restaurantName: restaurant.name });
      }
    });

    return () => {
      active = false;
    };
  }, [restaurantId]);

  if (cart.lines.length === 0) return <CartEmptyState />;

  if (!loaded || loaded.menu.restaurantId !== restaurantId) {
    return <CartSkeleton label={t("loading")} />;
  }

  const { menu, restaurantName } = loaded;
  const priced = getPricedLines(cart.lines, menu.categories);
  const total = getCartTotal(priced);
  const itemCount = priced.reduce((sum, line) => sum + line.quantity, 0);

  const formatPrice = (amount: number) =>
    t("price", { amount: format.number(amount) });

  const clearFieldError = (field: string) => () => {
    clearError(field);
    clearError("form");
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    const data = new FormData(event.currentTarget);
    const values = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      note: String(data.get("note") ?? ""),
    };

    const fieldErrors: Record<string, string> = {};

    if (!isOrderFieldValid("name", values)) {
      fieldErrors.name = t("form.nameError");
    }
    if (!isOrderFieldValid("phone", values)) {
      fieldErrors.phone = t("form.phoneError");
    }
    if (!isOrderFieldValid("note", values)) {
      fieldErrors.note = t("form.noteError");
    }

    if (Object.keys(fieldErrors).length > 0) {
      setMultipleErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await createOrder({
        restaurantId: menu.restaurantId,
        customerName: values.name,
        customerPhone: values.phone,
        orderNote: values.note,
        lines: cart.lines.map(({ menuItemId, quantity, note }) => ({
          menuItemId,
          quantity,
          note,
        })),
        idempotencyKey,
      });

      const message = [
        t("message.header", {
          orderNumber: order.orderNumber,
          name: order.customerName,
          phone: order.customerPhone,
        }),
        ...order.lines.map((line) =>
          t("message.line", {
            quantity: line.quantity,
            name: line.name,
            amount: format.number(line.price * line.quantity),
          }),
        ),
        t("message.total", { amount: format.number(order.total) }),
        order.orderNote && t("message.note", { note: order.orderNote }),
      ]
        .filter(Boolean)
        .join("\n");

      clear();
      window.location.assign(buildWhatsAppHref(menu.whatsapp, message));
    } catch {
      setFieldError("form", t("form.orderError"));
      setIsSubmitting(false);
    }
  }

  return (
    <section aria-labelledby="cart-heading" className="pb-16 font-hero">
      <div className="container mx-auto flex flex-col gap-8 px-4">
        <div className="flex flex-col gap-3">
          <Link
            href={`/restaurants/${menu.restaurantId}`}
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-accent transition-opacity hover:opacity-80"
          >
            <FiArrowLeft size={16} aria-hidden />
            {t("backToMenu")}
          </Link>
          <h1
            id="cart-heading"
            className="text-3xl font-bold leading-[1.125] text-accent sm:text-4xl"
          >
            {t("title")}
          </h1>
          <p className="text-base text-muted">
            {t("subtitle", { count: itemCount, restaurant: restaurantName })}
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_24rem]">
          <section
            aria-labelledby="cart-summary-heading"
            className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
          >
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
              <h2
                id="cart-summary-heading"
                className="text-lg font-bold text-charcoal"
              >
                {t("summary.title")}
              </h2>
              <Button
                type="button"
                onClick={clear}
                className="cursor-pointer text-sm font-medium text-muted transition-colors hover:text-danger"
              >
                {t("summary.clear")}
              </Button>
            </div>

            <ul className="divide-y divide-border">
              {priced.map(({ item, quantity, lineTotal }) => (
                <CartLineItem
                  key={item.id}
                  item={item}
                  quantity={quantity}
                  lineTotal={lineTotal}
                  onQuantityChange={(next) => updateQuantity(item.id, next)}
                />
              ))}
            </ul>
          </section>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5 rounded-2xl border border-border bg-background p-5 shadow-sm sm:p-6 lg:sticky lg:top-32"
          >
            <h2 className="text-lg font-bold text-charcoal">
              {t("form.title")}
            </h2>

            <CartField
              name="name"
              type="text"
              autoComplete="name"
              label={t("form.nameLabel")}
              icon={<FiUser size={16} strokeWidth={1.5} />}
              error={errors.name}
              onChange={clearFieldError("name")}
            />
            <CartField
              name="phone"
              type="tel"
              autoComplete="tel"
              label={t("form.phoneLabel")}
              icon={<FiPhone size={16} strokeWidth={1.5} />}
              error={errors.phone}
              onChange={clearFieldError("phone")}
            />
            <CartField
              name="note"
              type="text"
              label={t("form.noteLabel")}
              icon={<FiMessageSquare size={16} strokeWidth={1.5} />}
              error={errors.note}
              onChange={clearFieldError("note")}
            />

            <dl className="flex flex-col gap-2 border-t border-border pt-4 text-sm text-muted">
              <div className="flex items-center justify-between">
                <dt>{t("summary.items")}</dt>
                <dd className="font-medium text-charcoal">{itemCount}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-base font-semibold text-charcoal">
                  {t("total")}
                </dt>
                <dd className="text-xl font-bold text-accent">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>

            {errors.form && (
              <p role="alert" className="text-sm font-medium text-danger">
                {errors.form}
              </p>
            )}

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                variant="accent"
                disabled={isSubmitting}
                className="w-full"
              >
                <FaWhatsapp size={18} aria-hidden />
                {t("form.submit")}
              </Button>
              <p className="text-center text-xs leading-relaxed text-muted">
                {t("form.direct", { restaurant: restaurantName })}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
