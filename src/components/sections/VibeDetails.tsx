import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { FiArrowLeft, FiCalendar, FiClock, FiMapPin } from "react-icons/fi";

import VibeBooking from "@/components/sections/VibeBooking";
import VibeCountdown from "@/components/sections/VibeCountdown";
import VibeHighlights from "@/components/sections/VibeHighlights";
import VibePolicy from "@/components/sections/VibePolicy";
import VibeShareButton from "@/components/sections/VibeShareButton";
import VibeVenue from "@/components/sections/VibeVenue";
import { Link } from "@/lib/i18n/navigation";
import type { VibeEvent } from "@/mocks/vibeEvents";
import { VIBE_DATE_FORMAT, parseVibeDate } from "@/utils/vibe";

type VibeDetailsProps = {
  event: VibeEvent;
};

export default function VibeDetails({ event }: VibeDetailsProps) {
  const {
    category,
    title,
    description,
    date,
    endDate,
    location,
    time,
    image,
    venue,
    highlights,
    policy,
    booking,
  } = event;
  const t = useTranslations("Vibe");
  const format = useFormatter();

  const formatDate = (value: string) =>
    format.dateTime(parseVibeDate(value), VIBE_DATE_FORMAT);
  const dateLabel = endDate
    ? `${formatDate(date)} – ${formatDate(endDate)}`
    : formatDate(date);

  return (
    <>
      <section
        aria-labelledby="vibe-details-heading"
        className="relative flex min-h-80 items-end bg-background_deep font-hero lg:min-h-112"
      >
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-background_deep via-background_deep/40 to-transparent"
        />
        <div className="container relative mx-auto flex flex-col items-start gap-4 px-4 pb-8 pt-24 lg:pb-12">
          <div className="flex w-full items-center justify-between gap-4">
            <Link
              href="/vibe"
              className="flex items-center gap-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              <FiArrowLeft size={14} aria-hidden />
              {t("details.back")}
            </Link>
            <VibeShareButton title={title} />
          </div>
          <span className="rounded-full bg-background_deep/80 px-3 py-1 text-xs font-medium text-sun">
            {t(`items.${category}.title`)}
          </span>
          <h1
            id="vibe-details-heading"
            className="font-hero text-3xl font-bold leading-[1.125] text-background sm:text-4xl lg:text-5xl"
          >
            {title}
          </h1>
        </div>
      </section>

      <section className="bg-section-bg py-12 font-hero lg:py-15">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col gap-10 lg:col-span-2">
            <VibeCountdown date={date} time={time} />

            <div className="flex flex-col gap-3">
              <h2 className="font-hero text-2xl font-bold text-accent">
                {t("details.about")}
              </h2>
              <p className="text-base leading-7 text-charcoal">{description}</p>
            </div>

            {highlights && highlights.length > 0 && (
              <VibeHighlights highlights={highlights} />
            )}
            {venue && <VibeVenue venue={venue} />}
            {policy && policy.length > 0 && <VibePolicy policy={policy} />}
          </div>

          <div className="order-first flex flex-col gap-5 lg:order-0 lg:sticky lg:top-6 lg:self-start">
            <dl className="flex flex-col gap-5 rounded-xl bg-background p-5 shadow-md">
              <div className="flex items-start gap-3">
                <FiMapPin
                  size={18}
                  aria-hidden
                  className="mt-0.5 shrink-0 text-sun"
                />
                <div className="flex flex-col gap-0.5">
                  <dt className="text-xs font-medium text-muted">
                    {t("details.location")}
                  </dt>
                  <dd className="text-base font-semibold text-charcoal">
                    {location}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-border pt-5">
                <FiCalendar
                  size={18}
                  aria-hidden
                  className="mt-0.5 shrink-0 text-sun"
                />
                <div className="flex flex-col gap-0.5">
                  <dt className="text-xs font-medium text-muted">
                    {t("details.date")}
                  </dt>
                  <dd className="text-base font-semibold text-charcoal">
                    {dateLabel}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-border pt-5">
                <FiClock
                  size={18}
                  aria-hidden
                  className="mt-0.5 shrink-0 text-sun"
                />
                <div className="flex flex-col gap-0.5">
                  <dt className="text-xs font-medium text-muted">
                    {t("details.time")}
                  </dt>
                  <dd className="text-base font-semibold text-charcoal">
                    {time}
                  </dd>
                </div>
              </div>
            </dl>

            {booking && <VibeBooking event={event} booking={booking} />}
          </div>
        </div>
      </section>
    </>
  );
}