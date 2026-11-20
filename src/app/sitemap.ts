import type { MetadataRoute } from "next";

import { SITE_URL, SITEMAP_PATHS } from "@/constants/seo";
import { getLocalizedPath } from "@/lib/i18n/paths";
import { routing } from "@/lib/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}${getLocalizedPath(locale, path)}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((code) => [
            code,
            `${SITE_URL}${getLocalizedPath(code, path)}`,
          ]),
        ),
      },
    })),
  );
}