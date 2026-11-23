"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type TourGalleryProps = {
  tourId: string;
  images: string[];
};

const ARROW_CLASSES =
  "absolute top-1/2 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-background/90 text-accent shadow-md transition-opacity hover:opacity-80";

export default function TourGallery({ tourId, images }: TourGalleryProps) {
  const tTour = useTranslations("Tours");
  const t = useTranslations("Tours.details.gallery");
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  const total = images.length;
  const name = tTour(`items.${tourId}.name`);
  const showPrevious = () => setActiveIndex((index) => (index - 1 + total) % total);
  const showNext = () => setActiveIndex((index) => (index + 1) % total);

  return (
    <section aria-labelledby="tour-gallery-heading">
      <h2 id="tour-gallery-heading" className="sr-only">
        {t("title")}
      </h2>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_9rem] lg:gap-4">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-accent-soft shadow-md sm:aspect-video lg:aspect-auto lg:h-120">
          <Image
            src={images[activeIndex]}
            alt={t("imageAlt", { tour: name, index: activeIndex + 1 })}
            fill
            sizes="(min-width: 1280px) 1000px, 100vw"
            className="object-cover"
          />
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-background_deep/50 to-transparent"
          />

          {total > 1 && (
            <>
              <button
                type="button"
                aria-label={t("previousLabel")}
                onClick={showPrevious}
                className={`${ARROW_CLASSES} left-4`}
              >
                <FiChevronLeft size={22} aria-hidden />
              </button>
              <button
                type="button"
                aria-label={t("nextLabel")}
                onClick={showNext}
                className={`${ARROW_CLASSES} right-4`}
              >
                <FiChevronRight size={22} aria-hidden />
              </button>
              <p
                aria-live="polite"
                className="absolute bottom-4 left-4 rounded-full bg-background_deep/70 px-3 py-1 text-xs font-medium text-background backdrop-blur-sm"
              >
                {t("counter", { current: activeIndex + 1, total })}
              </p>
            </>
          )}
        </div>

        {total > 1 && (
          <ul className="flex gap-3 overflow-x-auto pb-1 lg:h-120 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0 lg:pr-1">
            {images.map((src, index) => (
              <li key={`${src}-${index}`} className="shrink-0 lg:w-full">
                <button
                  type="button"
                  aria-label={t("showLabel", { index: index + 1, total })}
                  aria-pressed={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                  className={[
                    "relative block aspect-4/3 w-28 cursor-pointer overflow-hidden rounded-xl border-2 transition-all hover:opacity-90 sm:w-36 lg:w-full",
                    index === activeIndex
                      ? "border-accent"
                      : "border-transparent opacity-70",
                  ].join(" ")}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 144px, 144px"
                    className="object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}