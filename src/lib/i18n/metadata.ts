import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { OG_IMAGE, SITE_NAME } from "@/constants/seo";

import { getLanguageAlternates, getLocalizedPath } from "./paths";

interface BuildMetadataOptions {
  locale: string;
  path?: string;
  title?: string;
  description?: string;
}

export async function buildMetadata({
  locale,
  path = "/",
  title,
  description,
}: BuildMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const pageTitle = title ?? t("title");
  const pageDescription = description ?? t("description");
  const image = {
    url: OG_IMAGE.src,
    width: OG_IMAGE.width,
    height: OG_IMAGE.height,
    alt: t("ogImageAlt"),
  };

  return {
    title: title ?? { absolute: pageTitle },
    description: pageDescription,
    alternates: {
      canonical: getLocalizedPath(locale, path),
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: pageTitle,
      description: pageDescription,
      url: getLocalizedPath(locale, path),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [image.url],
    },
  };
}
