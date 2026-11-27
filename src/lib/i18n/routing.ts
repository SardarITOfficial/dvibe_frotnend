import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pt", "fr", "de", "es", "no", "kea"],
  defaultLocale: "en",
});