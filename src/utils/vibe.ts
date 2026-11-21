import type { VibeCategoryId, VibeEvent } from "@/mocks/vibeEvents";

export type VibeFilter = VibeCategoryId | "all";

export const VIBE_CATEGORY_IDS: readonly VibeCategoryId[] = [
  "live-music",
  "events",
  "nightlife",
];

export function parseVibeFilter(
  value: string | string[] | undefined,
): VibeFilter {
  return VIBE_CATEGORY_IDS.find((id) => id === value) ?? "all";
}

export function filterVibeEvents(
  events: VibeEvent[],
  filter: VibeFilter,
): VibeEvent[] {
  return filter === "all"
    ? events
    : events.filter(({ category }) => category === filter);
}

export function getVibeEventById(
  events: VibeEvent[],
  id: string,
): VibeEvent | undefined {
  return events.find((event) => event.id === id);
}