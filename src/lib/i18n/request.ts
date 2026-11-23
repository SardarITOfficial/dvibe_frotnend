import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

const MESSAGE_FILES = ["common", "home", "restaurantProfile", "cart"] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const modules = await Promise.all(
    MESSAGE_FILES.map((file) => import(`../../messages/${locale}/${file}.json`)),
  );

  return {
    locale,
    messages: Object.assign({}, ...modules.map((module) => module.default)),
  };
});