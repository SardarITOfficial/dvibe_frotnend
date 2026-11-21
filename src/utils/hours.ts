const CAPE_VERDE_TIME_ZONE = "Atlantic/Cape_Verde";

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: CAPE_VERDE_TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function toMinutes(value: string | undefined): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value?.trim() ?? "");

  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
}

export function getCapeVerdeMinutes(date: Date): number {
  const parts = timeFormatter.formatToParts(date);
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const minute = Number(parts.find((part) => part.type === "minute")?.value);

  return hour * 60 + minute;
}

export function isOpenNow(hours: string, now = new Date()): boolean {
  const [openValue, closeValue] = hours.split("-");
  const open = toMinutes(openValue);
  const close = toMinutes(closeValue);

  if (open === null || close === null) return false;

  const current = getCapeVerdeMinutes(now);

  return open < close
    ? current >= open && current < close
    : current >= open || current < close;
}