import { useFormatter, useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";

import { Button } from "@/components/ui/Button";
import type { Tour } from "@/mocks/tours";
import { buildWhatsAppHref } from "@/utils/whatsapp";

type TourBookingProps = {
  tour: Pick<Tour, "id" | "whatsapp" | "price">;
};

export default function TourBooking({
  tour: { id, whatsapp, price },
}: TourBookingProps) {
  const t = useTranslations("Tours");
  const format = useFormatter();

  const message = t("details.booking.message", {
    tour: t(`items.${id}.name`),
  });

  return (
    <section
      aria-labelledby="tour-booking-heading"
      className="overflow-hidden rounded-2xl border border-border bg-background shadow-md"
    >
      <div className="flex flex-col gap-1 bg-background_deep px-6 py-5">
        <p className="text-xs font-medium uppercase tracking-[2.4px] text-sun">
          {t("details.price")}
        </p>
        <p className="flex items-baseline gap-2">
          <span className="font-hero text-3xl font-bold text-sun">
            {t("price", { amount: format.number(price) })}
          </span>
          <span className="text-sm text-background/70">{t("perPerson")}</span>
        </p>
      </div>

      <div className="flex flex-col gap-5 p-6">
        <div className="flex flex-col gap-1">
          <h2
            id="tour-booking-heading"
            className="font-hero text-xl font-bold text-accent"
          >
            {t("details.booking.title")}
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            {t("details.booking.description")}
          </p>
        </div>

        <Button
          variant="accent"
          href={buildWhatsAppHref(whatsapp, message)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <FaWhatsapp size={18} aria-hidden />
          {t("details.booking.cta")}
        </Button>
      </div>
    </section>
  );
}