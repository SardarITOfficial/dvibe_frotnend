import type { VibeCategoryId, VibeEvent } from "@/mocks/vibeEvents";

export type VibeFilter = VibeCategoryId | "all";
export type VibeTimeFilter =
  | "today"
  | "tomorrow"
  | "weekend"
  | "week"
  | "upcoming";

type VibeDateRange = { from: string; to: string | null };

type VibeQuery = {
  category: VibeFilter;
  time: VibeTimeFilter;
};

export const VIBE_CATEGORY_IDS: readonly VibeCategoryId[] = [
  "live-music",
  "events",
  "nightlife",
];

export const VIBE_TIME_FILTERS: readonly VibeTimeFilter[] = [
  "today",
  "tomorrow",
  "weekend",
  "week",
  "upcoming",
];

export const DEFAULT_VIBE_TIME_FILTER: VibeTimeFilter = "upcoming";

export const VIBE_DATE_FORMAT = {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: "UTC",
} as const;

export const VIBE_SHORT_DATE_FORMAT = {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
} as const;

export function parseVibeFilter(
  value: string | string[] | undefined,
): VibeFilter {
  return VIBE_CATEGORY_IDS.find((id) => id === value) ?? "all";
}

export function parseVibeTimeFilter(
  value: string | string[] | undefined,
): VibeTimeFilter {
  return (
    VIBE_TIME_FILTERS.find((filter) => filter === value) ??
    DEFAULT_VIBE_TIME_FILTER
  );
}

export function getVibeToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Atlantic/Cape_Verde",
  }).format(now);
}

export function parseVibeDate(date: string): Date {
  return new Date(`${date}T00:00:00Z`);
}

function addDays(date: string, days: number): string {
  const result = parseVibeDate(date);
  result.setUTCDate(result.getUTCDate() + days);

  return result.toISOString().slice(0, 10);
}

export function getVibeDateRange(
  filter: VibeTimeFilter,
  today: string,
): VibeDateRange {
  switch (filter) {
    case "today":
      return { from: today, to: today };
    case "tomorrow": {
      const tomorrow = addDays(today, 1);
      return { from: tomorrow, to: tomorrow };
    }
    case "weekend": {
      const day = parseVibeDate(today).getUTCDay();

      if (day === 0) {
        return { from: today, to: today };
      }

      const saturday = addDays(today, 6 - day);
      return { from: saturday, to: addDays(saturday, 1) };
    }
    case "week":
      return { from: today, to: addDays(today, 6) };
    case "upcoming":
      return { from: today, to: null };
  }
}

export function filterVibeEvents(
  events: VibeEvent[],
  { category, time, today }: VibeQuery & { today: string },
): VibeEvent[] {
  const { from, to } = getVibeDateRange(time, today);

  return events
    .filter(
      (event) =>
        (category === "all" || event.category === category) &&
        (event.endDate ?? event.date) >= from &&
        (to === null || event.date <= to),
    )
    .sort(
      (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time),
    );
}

export function buildVibeHref({ category, time }: VibeQuery): string {
  const params = new URLSearchParams();

  if (category !== "all") {
    params.set("category", category);
  }

  if (time !== DEFAULT_VIBE_TIME_FILTER) {
    params.set("when", time);
  }

  const query = params.toString();

  return query ? `/vibe?${query}` : "/vibe";
}

export function getVibeEventById(
  events: VibeEvent[],
  id: string,
): VibeEvent | undefined {
  return events.find((event) => event.id === id);
}


const CAPE_VERDE_UTC_OFFSET = "-01:00";

export type VibeCountdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getVibeEventStart(date: string, time: string): number {
  return new Date(`${date}T${time}:00${CAPE_VERDE_UTC_OFFSET}`).getTime();
}

export function getVibeCountdown(
  start: number,
  now: number,
): VibeCountdown | null {
  const remaining = start - now;

  if (remaining <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
