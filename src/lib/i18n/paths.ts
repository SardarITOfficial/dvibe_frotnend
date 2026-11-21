import { routing } from "./routing";

export function getLocalizedPath(locale: string, path = "/") {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function getLanguageAlternates(path = "/"): Record<string, string> {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, getLocalizedPath(locale, path)]),
    ),
    "x-default": getLocalizedPath(routing.defaultLocale, path),
  };
}