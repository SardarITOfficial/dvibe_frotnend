"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FiChevronLeft, FiChevronRight, FiGrid, FiX } from "react-icons/fi";

import type { TourGalleryImage } from "@/mocks/tours";

const MAX_PREVIEW_IMAGES = 5;
const CONTROL_CLASSES =
  "absolute z-10 flex size-12 items-center justify-center rounded-full border-[0.5px] border-stroke bg-background/10 text-background backdrop-blur-md transition-opacity hover:opacity-80";

type TourGalleryProps = {
  tourId: string;
  images?: TourGalleryImage[];
};

function getTileClasses(index: number, count: number) {
  if (index > 0) return "hidden sm:block";

  return count === 1 ? "sm:col-span-4 sm:row-span-2" : "sm:col-span-2 sm:row-span-2";
}

export default function TourGallery({ tourId, images }: TourGalleryProps) {
  const t = useTranslations("Tours");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const count = images?.length ?? 0;
  const isOpen = activeIndex !== null;

  const step = useCallback(
    (direction: 1 | -1) =>
      setActiveIndex((current) =>
        current === null ? current : (current + direction + count) % count,
      ),
    [count],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, step]);

  if (!images?.length) return null;

  const name = t(`items.${tourId}.name`);
  const getAlt = (index: number) => `${name} ${index + 1}`;

  return (
    <>
      <div className="relative">
        <div className="grid h-64 grid-rows-1 gap-2 overflow-hidden rounded-2xl shadow-md sm:h-96 sm:grid-cols-4 sm:grid-rows-2">
          {images.slice(0, MAX_PREVIEW_IMAGES).map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`group relative size-full overflow-hidden ${getTileClasses(index, count)}`}
            >
              <Image
                src={image.src}
                alt={getAlt(index)}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>

        {count > 1 && (
          <button
            type="button"
            onClick={() => setActiveIndex(0)}
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-medium text-charcoal shadow-md transition-opacity hover:opacity-80"
          >
            <FiGrid size={16} aria-hidden />
            {t("gallery.viewAll", { count })}
          </button>
        )}
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={name}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background_deep/95 p-4 sm:p-8"
        >
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            onClick={() => setActiveIndex(null)}
            className="absolute inset-0 cursor-default"
          />

          <div className="pointer-events-none relative h-full max-h-[80vh] w-full max-w-5xl">
            <Image
              src={images[activeIndex].src}
              alt={getAlt(activeIndex)}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            aria-label={t("gallery.close")}
            onClick={() => setActiveIndex(null)}
            className={`${CONTROL_CLASSES} right-4 top-4`}
          >
            <FiX size={20} aria-hidden />
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                aria-label={t("gallery.previous")}
                onClick={() => step(-1)}
                className={`${CONTROL_CLASSES} left-4 top-1/2 -translate-y-1/2`}
              >
                <FiChevronLeft size={22} aria-hidden />
              </button>
              <button
                type="button"
                aria-label={t("gallery.next")}
                onClick={() => step(1)}
                className={`${CONTROL_CLASSES} right-4 top-1/2 -translate-y-1/2`}
              >
                <FiChevronRight size={22} aria-hidden />
              </button>
              <p className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-sm font-medium text-background">
                {activeIndex + 1} / {count}
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}