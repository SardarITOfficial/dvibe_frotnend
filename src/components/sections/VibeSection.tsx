import type { ComponentType } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiArrowRight, FiCalendar, FiMusic } from "react-icons/fi";
import { LuMartini } from "react-icons/lu";

import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/i18n/navigation";
import { VIBES_CONFIG } from "@/mocks/vibes";

const VIBE_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  "live-music": FiMusic,
  events: FiCalendar,
  nightlife: LuMartini,
};

export default function VibeSection() {
  const t = useTranslations("Vibe");

  return (
    <section
      aria-labelledby="vibe-heading"
      className="bg-navy py-12 font-hero lg:py-15"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4 lg:gap-12">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3 sm:gap-4">
            <p className="text-sm font-medium uppercase leading-4 tracking-[2.4px] text-sun sm:text-base">
              {t("eyebrow")}
            </p>
            <h2
              id="vibe-heading"
              className="font-hero text-3xl font-bold leading-[1.125] text-background sm:text-4xl lg:text-5xl"
            >
              {t("title")}
            </h2>
          </div>

          <Button variant="accent" href={VIBES_CONFIG.href} className="shrink-0">
            {t("cta")}
            <FiArrowRight size={16} aria-hidden />
          </Button>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VIBES_CONFIG.vibes.map(({ id, href, image }) => {
            const Icon = VIBE_ICONS[id];

            return (
              <li key={id}>
                <Link
                  href={href}
                  className="group relative block aspect-[2/1] overflow-hidden rounded-xl border border-background/10"
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"
                  />
                  <span className="absolute bottom-4 left-5 flex items-center gap-3 text-background">
                    <span aria-hidden className="text-sun">
                      <Icon size={28} />
                    </span>
                    <span className="flex flex-col">
                      <h3 className="text-lg font-semibold leading-6">
                        {t(`items.${id}.title`)}
                      </h3>
                      <span className="text-xs">
                        {t(`items.${id}.description`)}
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}