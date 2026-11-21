"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

import { getVibeCountdown, getVibeEventStart } from "@/utils/vibe";

const UNITS = ["days", "hours", "minutes", "seconds"] as const;

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);

  return () => clearInterval(id);
}

const getSnapshot = () => Math.floor(Date.now() / 1000) * 1000;
const getServerSnapshot = () => null;

type VibeCountdownProps = {
  date: string;
  time: string;
};

export default function VibeCountdown({ date, time }: VibeCountdownProps) {
  const t = useTranslations("Vibe.details.countdown");
  const now = useSyncExternalStore<number | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const start = getVibeEventStart(date, time);

  if (now !== null && now >= start) {
    return null;
  }

  const countdown = now === null ? null : getVibeCountdown(start, now);

  return (
    <section
      aria-label={t("label")}
      className="flex flex-col gap-3 rounded-xl bg-background p-5 shadow-md"
    >
      <p className="text-sm font-medium text-muted">{t("label")}</p>
      <ul className="grid grid-cols-4 gap-3">
        {UNITS.map((unit) => (
          <li
            key={unit}
            className="flex flex-col items-center rounded-lg bg-accent-soft py-3"
          >
            <span className="font-hero text-2xl font-bold text-accent sm:text-3xl">
              {countdown ? String(countdown[unit]).padStart(2, "0") : "--"}
            </span>
            <span className="text-xs font-medium text-ink">{t(unit)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}