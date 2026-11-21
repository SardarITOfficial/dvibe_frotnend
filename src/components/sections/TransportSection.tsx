import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";

import { Link } from "@/lib/i18n/navigation";
import { TRANSPORT_CONFIG } from "@/mocks/transport";

export default function TransportSection() {
  const t = useTranslations("Transport");

  return (
    <section
      aria-labelledby="transport-heading"
      className="bg-section-bg py-12 font-hero lg:py-15"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4 lg:gap-12">
        <div className="flex flex-col gap-3 sm:gap-4">
          <p className="text-sm font-medium uppercase leading-4 tracking-[2.4px] text-accent sm:text-base">
            {t("eyebrow")}
          </p>
          <h2
            id="transport-heading"
            className="font-hero text-3xl font-bold leading-[1.125] text-charcoal sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
        </div>

        <ul className={`grid gap-5 lg:grid-cols-2`}>
          {TRANSPORT_CONFIG.services.map(({ id, href, image }) => (
            <li key={id}>
              <Link
                href={href}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background sm:flex-row"
              >
                <span className="relative block h-44 shrink-0 overflow-hidden sm:h-auto sm:min-h-44 sm:w-[45%]">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover object-bottom transition-transform duration-300 group-hover:scale-105"
                  />
                </span>

                <span className="flex flex-col justify-center gap-3 p-5 sm:gap-4 sm:px-6">
                  <h3 className="text-lg font-semibold leading-6 text-charcoal">
                    {t(`items.${id}.title`)}
                  </h3>
                  <span className="text-sm leading-6 text-subtle">
                    {t(`items.${id}.description`)}
                  </span>
                  <span className="flex items-center gap-2 text-sm font-medium text-sun">
                    {t(`items.${id}.cta`)}
                    <FiArrowRight size={14} aria-hidden />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
