import { useFormatter, useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";

import { Button } from "@/components/ui/Button";
import type {
  VibeBooking as VibeBookingData,
  VibeEvent,
} from "@/mocks/vibeEvents";
import { VIBE_DATE_FORMAT, parseVibeDate } from "@/utils/vibe";
import { buildWhatsAppHref } from "@/utils/whatsapp";

type VibeBookingProps = {
  event: VibeEvent;
  booking: VibeBookingData;
};

export default function VibeBooking({
  event: { title, date, time, tickets },
  booking: { whatsapp },
}: VibeBookingProps) {
  const t = useTranslations("Vibe.details.booking");
  const format = useFormatter();

  const message = t("message", {
    title,
    date: format.dateTime(parseVibeDate(date), VIBE_DATE_FORMAT),
    time,
  });

  return (
    <section
      aria-labelledby="vibe-booking-heading"
      className="flex flex-col gap-4 rounded-xl bg-background p-5 shadow-md"
    >
      <div className="flex flex-col gap-1">
        <h2
          id="vibe-booking-heading"
          className="font-hero text-xl font-bold text-accent"
        >
          {t("title")}
        </h2>
        <p className="text-sm text-muted">{t("description")}</p>
      </div>

      {tickets && tickets.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-border pt-4">
          <h3 className="text-xs font-medium text-muted">
            {t("ticketsLabel")}
          </h3>
          <ul className="flex flex-col gap-3">
            {tickets.map(({ name, price, description }) => (
              <li
                key={name}
                className="flex items-start justify-between gap-4"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-charcoal">
                    {name}
                  </span>
                  {description && (
                    <span className="text-xs text-muted">{description}</span>
                  )}
                </div>
                <span className="shrink-0 text-sm font-semibold text-accent">
                  {price}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button
        variant="accent"
        href={buildWhatsAppHref(whatsapp, message)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={18} aria-hidden />
        {t("cta")}
      </Button>
    </section>
  );
}