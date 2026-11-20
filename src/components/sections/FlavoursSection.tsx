import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";

import { Button } from "@/components/ui/Button";
import { FLAVOURS_CONFIG } from "@/mocks/flavours";

export default function FlavoursSection() {
  const t = useTranslations("Flavours");

  return (
    <section
      aria-labelledby="flavours-heading"
      className="py-12 font-hero lg:py-15"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4 lg:gap-12">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3 sm:gap-4">
            <p className="text-sm font-medium uppercase leading-4 tracking-[2.4px] text-accent sm:text-base">
              {t("eyebrow")}
            </p>
            <h2
              id="flavours-heading"
              className="font-hero text-3xl font-bold leading-[1.125] text-charcoal sm:text-4xl lg:text-5xl"
            >
              {t("title")}
            </h2>
          </div>

          <Button
            variant="accent"
            href={FLAVOURS_CONFIG.href}
            className="shrink-0"
          >
            {t("cta")}
            <FiArrowRight size={16} aria-hidden />
          </Button>
        </div>

        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {FLAVOURS_CONFIG.flavours.map(({ id, image }) => (
            <li key={id} className="flex flex-col items-center gap-3">
              <div className="relative aspect-8/5 w-full overflow-hidden rounded-xl">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-semibold text-charcoal">
                {t(`items.${id}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
