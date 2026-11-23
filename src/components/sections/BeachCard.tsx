import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiMapPin, FiNavigation, FiSun } from "react-icons/fi";

import { Button } from "@/components/ui/Button";
import type { Beach } from "@/mocks/beaches";

type BeachCardProps = {
  beach: Beach;
};

export default function BeachCard({
  beach: { id, name, location, highlight, image, mapUrl },
}: BeachCardProps) {
  const t = useTranslations("Beaches");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-background shadow-md">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 px-4 pb-4 pt-5">
        <div className="flex flex-col gap-2">
          <h3 className="font-hero text-base font-semibold text-charcoal">
            {name}
          </h3>
          <p className="text-sm leading-relaxed text-muted">
            {t(`descriptions.${id}`)}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border pt-4 text-sm font-medium">
          <p className="flex items-center gap-2 text-charcoal">
            <FiMapPin size={14} aria-hidden className="shrink-0 text-sun" />
            {location}
          </p>
          <p className="flex items-center gap-2 text-accent">
            <FiSun size={14} aria-hidden className="shrink-0" />
            {t(`highlights.${highlight}`)}
          </p>
        </div>

        <Button
          variant="outline"
          size="md"
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <FiNavigation size={16} aria-hidden className="shrink-0" />
          {t("card.takeMeThere")}
          <span className="sr-only">
            : {name} ({t("card.opensInNewTab")})
          </span>
        </Button>
      </div>
    </article>
  );
}