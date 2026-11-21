import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";

import { Button } from "@/components/ui/Button";
import { CTA_CONFIG } from "@/mocks/cta";

export default function CtaSection() {
  const t = useTranslations("Cta");

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden py-16 font-hero lg:py-20"
    >
      <Image
        src={CTA_CONFIG.image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-bottom"
      />
      <span aria-hidden className="absolute inset-0 bg-black/55" />

      <div className="container relative mx-auto flex flex-col items-center gap-4 px-4 text-center text-background">
        <h2
          id="cta-heading"
          className="font-display text-3xl italic leading-tight sm:text-4xl lg:text-5xl"
        >
          {t("title")}
        </h2>
        <p className="text-sm sm:text-base">{t("description")}</p>

        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          <Button variant="accent" href={CTA_CONFIG.primaryHref}>
            {t("primaryCta")}
            <FiArrowRight size={16} aria-hidden />
          </Button>
          <Button variant="glass" href={CTA_CONFIG.secondaryHref}>
            {t("secondaryCta")}
            <FiArrowRight size={16} aria-hidden />
          </Button>
        </div>
      </div>
    </section>
  );
}