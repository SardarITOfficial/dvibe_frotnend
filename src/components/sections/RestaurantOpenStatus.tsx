"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

import { isOpenNow } from "@/utils/hours";

const REFRESH_INTERVAL_MS = 60_000;

type RestaurantOpenStatusProps = {
  hours: string;
};

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, REFRESH_INTERVAL_MS);

  return () => clearInterval(id);
}

export default function RestaurantOpenStatus({
  hours,
}: RestaurantOpenStatusProps) {
  const t = useTranslations("RestaurantProfile.status");
  const isOpen = useSyncExternalStore<boolean | null>(
    subscribe,
    () => isOpenNow(hours),
    () => null,
  );

  if (isOpen === null) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        isOpen ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
      }`}
    >
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${isOpen ? "bg-success" : "bg-danger"}`}
      />
      {isOpen ? t("open") : t("closed")}
    </span>
  );
}