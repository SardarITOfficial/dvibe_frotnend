import type { ComponentType } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiArrowRight, FiSunset } from "react-icons/fi";
import { LuMountain, LuUmbrella } from "react-icons/lu";

import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/i18n/navigation";
import { ISLAND_CONFIG } from "@/mocks/island";

const ISLAND_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  beaches: LuUmbrella,
  "sunset-spots": FiSunset,
  tours: LuMountain,
};

export default function IslandSection() {
  const t = useTranslations("Island");

  return (
    <section
      aria-labelledby="island-heading"
      className="py-12 font-hero lg:py-15"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4 lg:gap-12">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3 sm:gap-4">
            <p className="text-sm font-medium uppercase leading-4 tracking-[2.4px] text-accent sm:text-base">
              {t("eyebrow")}
            </p>
            <h2
              id="island-heading"
              className="font-hero text-3xl font-bold leading-[1.125] text-charcoal sm:text-4xl lg:text-5xl"
            >
              {t("title")}
            </h2>
          </div>

          <Button variant="accent" href={ISLAND_CONFIG.href} className="shrink-0">
            {t("cta")}
            <FiArrowRight size={16} aria-hidden />
          </Button>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ISLAND_CONFIG.places.map(({ id, href, image }) => {
            const Icon = ISLAND_ICONS[id];

            return (
              <li key={id}>
                <Link
                  href={href}
                  className="group block overflow-hidden rounded-xl border border-border bg-cream"
                >
                  <span className="relative block aspect-[2/1] w-full overflow-hidden">
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </span>

                  <span className="flex items-center gap-4 px-5 py-4">
                    <span aria-hidden className="shrink-0 text-sun">
                      <Icon size={28} />
                    </span>
                    <span className="flex flex-col">
                      <h3 className="text-lg font-semibold leading-6 text-charcoal">
                        {t(`items.${id}.title`)}
                      </h3>
                      <span className="text-sm text-subtle">
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