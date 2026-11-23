import { useTranslations } from "next-intl";
import { FiShoppingBag } from "react-icons/fi";

import { Button } from "@/components/ui/Button";

export default function CartEmptyState() {
  const t = useTranslations("Cart");

  return (
    <section aria-labelledby="cart-heading" className="pb-16 font-hero">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-5 rounded-2xl border border-border bg-background px-6 py-14 text-center shadow-sm">
          <span className="flex size-20 items-center justify-center rounded-full bg-accent-soft text-accent">
            <FiShoppingBag size={36} aria-hidden />
          </span>
          <h1 id="cart-heading" className="text-2xl font-bold text-charcoal">
            {t("empty.title")}
          </h1>
          <p className="text-muted">{t("empty.description")}</p>
          <Button variant="accent" href="/restaurants">
            {t("empty.cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
