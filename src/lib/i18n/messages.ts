import { routing } from "./routing";

const MESSAGE_FILES = [
  "common",
  "home",
  "restaurantProfile",
  "cart",
  "sunsetSpots",
  "beaches",
  "tours",
  "status",
  "auth",
  "taxi",
  "carRental",
] as const;

type Messages = Record<string, unknown>;

function isPlainObject(value: unknown): value is Messages {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function deepMerge(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base };

  for (const [key, value] of Object.entries(override)) {
    const current = result[key];

    result[key] =
      isPlainObject(current) && isPlainObject(value)
        ? deepMerge(current, value)
        : value;
  }

  return result;
}

async function loadLocaleMessages(locale: string): Promise<Messages> {
  const modules = await Promise.all(
    MESSAGE_FILES.map((file) =>
      import(`../../messages/${locale}/${file}.json`)
        .then((module) => module.default as Messages)
        .catch(() => ({})),
    ),
  );

  return Object.assign({}, ...modules);
}

export async function loadMessages(locale: string): Promise<Messages> {
  const defaults = await loadLocaleMessages(routing.defaultLocale);

  if (locale === routing.defaultLocale) return defaults;

  return deepMerge(defaults, await loadLocaleMessages(locale));
}