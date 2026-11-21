import Image from "next/image";
import { useTranslations } from "next-intl";

import HeroSearchForm from "@/components/sections/HeroSearchForm";
import { Button } from "@/components/ui/Button";
import { HERO_CONFIG } from "@/mocks/hero";

export default function HeroSection() {
  const t = useTranslations("Hero");

  const { image, categories } = HERO_CONFIG;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh items-center overflow-hidden pb-16 pt-28 font-hero lg:pb-12 lg:pt-44.75"
    >
      <Image
        src={image.src}
        alt={t("imageAlt")}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-l from-black/10 to-black/50"
      />

      <div className="container relative mx-auto px-4">
        <div className="flex max-w-3xl flex-col gap-8 lg:gap-10 ">
          <div className="flex flex-col items-start gap-4">
            <span className="rounded-full border-[0.5px] border-background/20 bg-background/10 px-3 py-2 text-xs font-medium uppercase leading-4 tracking-wider text-background backdrop-blur-sm sm:px-4 sm:text-sm sm:tracking-[2px] lg:text-base">
              {t("badge")}
            </span>

            <div className="flex w-full  flex-col gap-4 lg:gap-6">
              <h1
                id="hero-heading"
                className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-normal italic leading-[1.2] text-background"
              >
                {t("heading")}
              </h1>

              <p className="text-md leading-[1.6] text-background sm:text-xl">
                <strong className="font-bold">
                  {t("description.highlight")}
                </strong>{" "}
                {t("description.text")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <HeroSearchForm />

            <ul className="flex flex-wrap gap-3 sm:gap-4">
              {categories.map(({ id, href, icon: Icon }) => (
                <li key={id}>
                  <Button href={href} variant="glass" size="sm">
                    <Icon
                      size={16}
                      strokeWidth={1.5}
                      className="text-secondary"
                    />
                    {t(`categories.${id}`)}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
