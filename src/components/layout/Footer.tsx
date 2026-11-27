import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";
import { FOOTER_COLUMNS, FOOTER_CONFIG, SOCIAL_LINKS } from "@/mocks/footer";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-background_deep font-hero text-background">
      <div className="container mx-auto flex flex-col gap-8 px-4 py-8 sm:gap-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-10 lg:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-5 sm:col-span-1 sm:gap-6">
            <div className="flex flex-col gap-4">
              <Image
                src={FOOTER_CONFIG.logo}
                alt={t("logoAlt")}
                width={160}
                height={48}
                className="h-auto w-32 sm:w-40"
              />
              <p className="max-w-56 text-sm leading-6">{t("tagline")}</p>
            </div>

            <section
              aria-labelledby="footer-social"
              className="flex flex-col gap-3"
            >
              <h2
                id="footer-social"
                className="text-sm font-semibold uppercase tracking-wide"
              >
                {t("social.title")}
              </h2>
              <ul className="flex gap-3">
                {SOCIAL_LINKS.map(({ id, href, icon: Icon }) => (
                  <li key={id}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t(`social.links.${id}`)}
                      className="flex size-10 items-center justify-center rounded-full border border-background/20 text-background/80 transition-opacity hover:opacity-80"
                    >
                      <Icon size={18} aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {FOOTER_COLUMNS.map(({ id, links }) => (
            <nav key={id} aria-labelledby={`footer-${id}`}>
              <h2
                id={`footer-${id}`}
                className="text-sm font-semibold uppercase tracking-wide"
              >
                {t(`columns.${id}.title`)}
              </h2>

              <ul className="mt-3 flex flex-col items-start gap-2 sm:mt-5 sm:gap-3">
                {links.map(({ id: linkId, href }) => (
                  <li key={linkId}>
                    <Link
                      href={href}
                      className="text-sm text-background/80 transition-opacity hover:opacity-80"
                    >
                      {t(`columns.${id}.links.${linkId}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-background/10 pt-4 sm:pt-6 text-sm text-background/80 sm:flex-row sm:justify-between">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <p>{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}